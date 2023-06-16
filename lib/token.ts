import { OCAPIToken } from '@/types';
import { redis } from './redis';
const {
  auth: { auth },
} = require('sfcc-ci');

const KEY = 'token-sfcc-sandbox-dashboard';

export const revalidate = 0; // disable cache

const authWithSFCC = () => {
  const clientId = process.env.SFCC_CLIENT_ID;
  const clientSecret = process.env.SFCC_CLIENT_SECRET;
  if (!(clientId && clientSecret)) {
    console.error('SFCC_CLIENT_ID and/or SFCC_CLIENT_SECRET are empty.');
    return null;
  }

  return new Promise((resolve, reject) =>
    auth(clientId, clientSecret, (error: any, _token: string) => {
      console.log(_token);
      if (error) reject(error);
      else resolve(_token);
    })
  );
};

export async function getToken() {
  let tokenObj: OCAPIToken = await redis.get(KEY);
  console.log('tokenObj', tokenObj);

  if (
    tokenObj == null ||
    (tokenObj?.expire && Date.now() - tokenObj.expire > 1000 * 60)
  ) {
    const token = await authWithSFCC();

    await redis.set(KEY, {
      key: token,
      expire: Date.now(),
    });
    tokenObj = await redis.get(KEY);
  }

  return tokenObj;
}

export async function getTokenForSeed() {
  const token = await authWithSFCC();
  const tokenObj : OCAPIToken = {
    key: token as string,
    expire : Date.now()
  };
  return tokenObj;
}
