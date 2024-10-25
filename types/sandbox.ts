export type SandboxDetailResponseData = {
  id: string
  realm: string
  instance: string
  versions: {
    app: string
    web: string
  }
  autoScheduled: true
  resourceProfile: string //enum ?
  state: string //enum ?
  createdAt: string
  createdBy: string
  hostName: string
  links: {
    bm: string
    ocapi: string
    impex: string
    code: string
    logs: string
  }
}

export type SandboxDetailResponse = {
  kind: string
  code: number
  status: string
  data: SandboxDetailResponseData
}

export type SandboxListResponse = {
  kind: string
  code: number
  status: string
  data: SandboxDetailResponseData[]
}

export type RealmUsageResponseData = {
  id: string
  createdSandboxes: number
  activeSandboxes: number
  deletedSandboxes: number
  sandboxSeconds: number
  minutesUpByProfile: {
      profile: string
      minutes: number
    }[]
  minutesUp: number
  minutesDown: number,
  granularUsage: any
}

export type RealmUsageResponse = {
  kind: string
  code: number
  status: string
  data: RealmUsageResponseData
}

export type SandboxUsageResponseData = {
  id: string
  sandboxSeconds: number
  minutesUp: number
  minutesDown: number
  history: [
    {
      from: string
      to: string
      sandboxSeconds: number
      resourceProfile: string
      exceedsTimeframe: boolean
    }
  ]
}

export type SandboxUsageResponse = {
  kind: string
  code: number
  status: string
  data: SandboxUsageResponseData
}

export type SandboxStorageValues = {
  spaceTotal: number
  spaceUsed: number
  percentageUsed: number
}

export type SandboxStorageResponseData = {
  sharedata: SandboxStorageValues
  realmdata: SandboxStorageValues
}

export type SandboxStorageResponse = {
  kind: string
  code: number
  status: string
  data: SandboxStorageResponseData
}

export type SandboxOperationsResponseData = {
  id: string
  operation: string
  createdAt: string
  operationState: string
  status: string
}

export type SandboxOperationsResponse = {
  kind: string
  code: number
  status: string
  metadata: {
    page: number
    perPage: number
    pageCount: number
    totalCount: number
    links: {
      self: string
      first: string
      last: string
    }
  }
  data: SandboxOperationsResponseData[]
}
