import { OCAPIToken } from '@/types'

import { RealmUsageResponseData } from '@/types/sandbox'
import { config } from '@/config/sandbox'
import { db } from '@/lib/db'
import { SandboxAPI } from '@/lib/sandbox'
import { getTokenForSeed } from '@/lib/token'

async function buildQuery(data: RealmUsageResponseData, date: string) {

  const { id, granularUsage, ...otherProps } = data

  const obj = {
    date,
    ...otherProps,
  }

  return obj;
}

async function getUsage(tokenObj: OCAPIToken, from: string, to: string) {
  if (tokenObj === null) {
    return
  }

  const sandboxAPI = new SandboxAPI(tokenObj.key)
  const usageData: RealmUsageResponseData = await sandboxAPI.getRealmUsage(
    from,
    to
  )

  const query = await buildQuery(usageData, from)
  const {data, error} = await db.from('daily_usage').insert(query)
  if (error) {
    console.error('Error inserting rows:', error);
  } else {
    console.log('Rows inserted successfully:', data);
  }
}

function getDateString(date: Date) {
  return date.toISOString().split('T')[0]
}

export async function seed() {
  const { from, to } = config.seed
  console.log('from', from)
  console.log('to', to)

  const tokenObj: OCAPIToken = await getTokenForSeed()

  const lastDate = new Date(from)
  let currentDate = new Date(to)

  while (true) {
    if (lastDate > currentDate) {
      break
    }

    await getUsage(
      tokenObj,
      getDateString(currentDate),
      getDateString(currentDate)
    )

    currentDate.setDate(currentDate.getDate() - 1)
  }
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log('end')
  })
