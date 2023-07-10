import {
  RealmUsageResponse,
  RealmUsageResponseData,
  SandboxDetailResponse,
  SandboxDetailResponseData,
  SandboxListResponse,
  SandboxOperationsResponse,
  SandboxOperationsResponseData,
  SandboxStorageResponse,
  SandboxStorageResponseData,
  SandboxUsageResponse,
  SandboxUsageResponseData,
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

  async getSandboxUsage(id: string): Promise<SandboxUsageResponseData> {
    const url = `${this.base_url}/sandboxes/${id}/usage`
    const response = await fetch(url, this.getHeader())
    const { data: data }: SandboxUsageResponse = await response.json()
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

  async getSandboxStorage(id: string): Promise<SandboxStorageResponseData> {
    const url = `${this.base_url}/sandboxes/${id}/storage`
    const response = await fetch(url, this.getHeader())
    const { data: data }: SandboxStorageResponse = await response.json()
    return data
  }

  async getSandboxOperations(id: string): Promise<SandboxOperationsResponse> {
    const url = `${this.base_url}/sandboxes/${id}/operations`
    const response = await fetch(url, this.getHeader())
    const res: SandboxOperationsResponse = await response.json()
    return res
  }

  async setSandboxState(id: string, operation) {
    const url = `${this.base_url}/sandboxes/${id}/operations`
    const header = this.getHeader()
    header.method = 'POST'
    header.body = JSON.stringify({
      operation,
    })
    const response = await fetch(url, header)
    const res = await response.json()
    return res
  }
}
