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
  minutesUpByProfile: [
    {
      profile: string
      minutes: number
    }
  ]
  minutesUp: number
  minutesDown: number
}

export type RealmUsageResponse = {
  kind: string
  code: number
  status: string
  data: RealmUsageResponseData
}
