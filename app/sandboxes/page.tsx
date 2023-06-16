import { OCAPI } from '@/lib/ocapi'
import { OCAPIToken } from "@/types"
import { getToken } from '@/lib/token';

import { columns } from "./columns"
import { DataTable } from "./data-table"

async function getData() {
  const tokenObj : OCAPIToken = await getToken();
  
  if (!tokenObj) {
    return null;
  }
  
  const ocapiObj  = new OCAPI(tokenObj.key);
  const sandboxes = await ocapiObj.getSandboxes();
  const sandboxesWithBMLink =  sandboxes.map((element) => {
    return {
      ...element,
      bmLink: element.links.bm
    }
  })

  return sandboxesWithBMLink;
}

export default async function SandboxesPage() {
  const data = await getData();
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
