import { notFound } from 'next/navigation'
import { OCAPIToken } from '@/types'

import { SandboxDetailResponseData } from '@/types/sandbox'
import { SandboxAPI } from '@/lib/sandbox'
import { getToken } from '@/lib/token'
import DetailStatus from '@/components/sandbox-detail-status'

export const revalidate = 0 // disable cache

interface PageProps {
  params: {
    id: string
  }
}
/*
Detail
- Realm => abcd
- Instance => 003
- State => stopped, started
- autoScheduled => true
- Links => BM, Impex, Logs

- Resource Profile => Medium
- Versions => app , web
- Hostname => abcd-003.dx.commercecloud.salesforce.com
Usage
- Graph
Storage
- Share data => Space total, space used, percentage used
- Realm data => Space total, space used, percentage used
Operation
- Operation List Table
*/
async function getData(id: string): Promise<SandboxDetailResponseData | null> {
  const tokenObj: OCAPIToken = await getToken()

  if (!tokenObj) {
    return null
  }

  const sandboxObj = new SandboxAPI(tokenObj.key)
  const sandboxes: SandboxDetailResponseData =
    await sandboxObj.getSandboxDetail(id)
  return sandboxes
}

export default async function PagePage({ params }: PageProps) {
  const page = await getData(params.id)

  if (!page) {
    notFound()
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container mx-auto py-10">
        <DetailStatus data={page} />
        <pre>{JSON.stringify(page, null, 2)}</pre>
      </div>
    </section>
  )
}
