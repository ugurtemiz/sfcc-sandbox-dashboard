import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { db } from '@/lib/db'
import { buttonVariants } from '@/components/ui/button'
import ChartView from '@/components/chart-view'

async function getData() {
  const result = await db.execute(
    'SELECT date, minutesUp FROM daily_usage ORDER BY DATE ASC;'
  )

  return result.rows
}

export default async function IndexPage() {
  const data = await getData()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed components <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Accessible and customizable components that you can copy and paste
          into your apps. Free. Open Source. And Next.js 13 Ready.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: 'outline' })}
        >
          GitHub
        </Link>
      </div>
      <ChartView data={data} />
    </section>
  )
}
