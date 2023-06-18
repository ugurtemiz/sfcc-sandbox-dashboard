import { notFound } from "next/navigation"
import { SandboxAPI } from '@/lib/sandbox'
import { OCAPIToken } from "@/types"
import { getToken } from '@/lib/token';

export const revalidate = 0; // disable cache

interface PageProps {
  params: {
    id: string
  }
}

async function getData(id : string) {
  const tokenObj : OCAPIToken = await getToken();
  
  if (!tokenObj) {
    return null;
  }
  
  const sandboxObj  = new SandboxAPI(tokenObj.key);
  const sandboxes = await sandboxObj.getSandboxDetail(id);
  return sandboxes
}

export default async function PagePage({ params }: PageProps) {
  const page = await getData(params.id);

  if (!page) {
    notFound()
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="container mx-auto py-10">
        <pre>
          {JSON.stringify(page, null,2)}
        </pre>
      </div>
    </section>
  )
}
