import { notFound } from 'next/navigation'
import { OCAPIToken } from '@/types'

import {
  SandboxDetailResponseData,
  SandboxOperationsResponse,
  SandboxStorageResponseData,
  SandboxUsageResponseData,
} from '@/types/sandbox'
import { SandboxAPI } from '@/lib/sandbox'
import { getToken } from '@/lib/token'
import ChartViewSandbox from '@/components/chart-view-sandbox'
import DetailStatus from '@/components/sandbox-detail-status'
import OperationsTable from '@/components/table-operations'
import StorageBar from '@/components/usage-bar'

interface PageProps {
  params: {
    id: string
  }
}

async function getDetailData(
  id: string
): Promise<SandboxDetailResponseData | null> {
  const tokenObj: OCAPIToken = await getToken()

  if (!tokenObj) {
    return null
  }

  const sandboxObj = new SandboxAPI(tokenObj.key)
  const sandboxes: SandboxDetailResponseData =
    await sandboxObj.getSandboxDetail(id)
  return sandboxes
}

async function getUsageData(
  id: string
): Promise<SandboxUsageResponseData | null> {
  const tokenObj: OCAPIToken = await getToken()

  if (!tokenObj) {
    return null
  }

  const sandboxObj = new SandboxAPI(tokenObj.key)
  const usage: SandboxUsageResponseData = await sandboxObj.getSandboxUsage(id)
  const { history, ...otherProps } = usage
  const processedHistory = history.map(function (element) {
    const { from, ...otherProps } = element
    return {
      from: from.split('T')[0],
      ...otherProps,
    }
  })
  return {
    history: processedHistory,
    ...otherProps,
  }
}

async function getStorageData(
  id: string
): Promise<SandboxStorageResponseData | null> {
  const tokenObj: OCAPIToken = await getToken()

  if (!tokenObj) {
    return null
  }

  const sandboxObj = new SandboxAPI(tokenObj.key)
  const storage: SandboxStorageResponseData =
    await sandboxObj.getSandboxStorage(id)
  return storage
}

async function getOperationsData(
  id: string
): Promise<SandboxOperationsResponse | null> {
  const tokenObj: OCAPIToken = await getToken()

  if (!tokenObj) {
    return null
  }

  const sandboxObj = new SandboxAPI(tokenObj.key)
  const operations: SandboxOperationsResponse =
    await sandboxObj.getSandboxOperations(id)
  return operations
}

export default async function SandboxDetailPage({ params }: PageProps) {
  const page = await getDetailData(params.id)
  const usage = await getUsageData(params.id)
  const storage = await getStorageData(params.id)
  const operations = await getOperationsData(params.id)

  if (!page) {
    notFound()
  }

  return (
    <>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {page.realm.toUpperCase()}
          </h1>
          <h2>{page.instance}</h2>
        </div>
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="container mx-auto py-10">
          <DetailStatus data={page} />
          <ChartViewSandbox data={usage} />
          <StorageBar data={storage?.sharedata} />
          <StorageBar data={storage?.realmdata} />
          <OperationsTable data={operations?.data} />
        </div>
      </section>
    </>
  )
}
