import { OCAPIToken } from '@/types'

import { SandboxAPI } from '@/lib/sandbox'
import { getToken } from '@/lib/token'

export async function POST(
  req: Request,
  context: { params: { sandboxid: string } }
) {
  try {
    console.log(context.params.sandboxid)
    const { operation } = await req.json()
    console.log(operation)
    const tokenObj: OCAPIToken = await getToken()

    if (!tokenObj) {
      return null
    }

    console.log(tokenObj)

    const sandboxObj = new SandboxAPI(tokenObj.key)
    const stateResult = await sandboxObj.setSandboxState(
      context.params.sandboxid,
      operation
    )
    console.log(stateResult)

    return new Response(JSON.stringify(stateResult), { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
