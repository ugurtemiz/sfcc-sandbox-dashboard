import {
  RealmUsageResponse,
  RealmUsageResponseData,
  SandboxDetailResponse,
  SandboxDetailResponseData,
  SandboxListResponse,
} from '@/types/sandbox'
import { config } from '@/config/sandbox'

export class SandboxAPI {
  token: string
  base_url: string

  constructor(token: string) {
    this.token = token
    this.base_url = config.base_url
  }

  private getHeader(): Object {
    return {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    }
  }

  async getSandboxes(): Promise<SandboxDetailResponseData[]> {
    const url = `${this.base_url}/sandboxes`
    const response = await fetch(url, this.getHeader())
    const { data: data }: SandboxListResponse = await response.json()
    return data
  }

  async getSandboxDetail(id: string): Promise<SandboxDetailResponseData> {
    const url = `${this.base_url}/sandboxes/${id}`
    const response = await fetch(url, this.getHeader())
    const { data: data }: SandboxDetailResponse = await response.json()
    return data
  }

  async getRealmUsage(
    from: string,
    to: string
  ): Promise<RealmUsageResponseData> {
    const url =
      `${config.base_url}/realms/` +
      `${config.realm.id}/usage?from=${from}&to=${to}`
    const response = await fetch(url, this.getHeader())
    const { data: data }: RealmUsageResponse = await response.json()
    console.log(data)
    return data
  }
}
