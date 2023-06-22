export type OCAPIToken = {
  key: string
  expire: number
} | null

export type UsageData = {
  id: string
  createdSandboxes: number
  activeSandboxes: number
  deletedSandboxes: number
  sandboxSeconds: number
  minutesUpByProfile: Object[]
  minutesUp: number
  minutesDown: number
}
