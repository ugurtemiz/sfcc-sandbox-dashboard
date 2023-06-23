import { OCAPIToken, UsageData } from '@/types'

import { config } from '@/config/sandbox'
import { db } from '@/lib/db'
import { getTokenForSeed } from '@/lib/token'

async function buildParams(
  data: UsageData,
  date: string
): { query: string; value: [] } {
  const {
    id,
    createdSandboxes,
    activeSandboxes,
    deletedSandboxes,
    sandboxSeconds,
    minutesUpByProfile,
    ...otherProps
  } = data
  const obj = {
    date,
    createdSandboxes,
    activeSandboxes,
    deletedSandboxes,
    sandboxSeconds,
    minutesUpByProfile: JSON.stringify(minutesUpByProfile),
    ...otherProps,
  }

  const column_names = Object.keys(obj)

  const query =
    `INSERT INTO daily_usage (${column_names.join(',')}) ` +
    `VALUES (${Array.from({ length: column_names.length }, () => '?')})`
  const value = Object.values(obj)

  return {
    query,
    value,
  }
}

async function getUsage(tokenObj: OCAPIToken, from: string, to: string) {
  if (tokenObj === null) {
    return
  }

  const url = `${config.base_url}/realms/${config.realm.id}/usage?from=${from}&to=${to}`

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenObj.key}`,
    },
  })

  const res = await response.json()
  console.log(res)
  const { data: data } = res

  const params = await buildParams(data, from)
  console.log(params)
  const result = await db.execute(params.query, params.value)
  console.log(result)
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
