import { OCAPIToken } from '@/types'

import { SandboxAPI } from '@/lib/sandbox'
import { getToken } from '@/lib/token'

import { columns } from './columns'
import { DataTable } from './data-table'

async function getData() {
  const tokenObj: OCAPIToken = await getToken()

  if (!tokenObj) {
    return null
  }

  const sandboxObj = new SandboxAPI(tokenObj.key)
  const sandboxes = await sandboxObj.getSandboxes()
  const sandboxesWithBMLink = sandboxes.map((element) => {
    return {
      ...element,
      bmLink: element.links.bm,
    }
  })

  return sandboxesWithBMLink
}

export default async function SandboxesPage() {
  const data = await getData()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
