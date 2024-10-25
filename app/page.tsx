import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { db } from '@/lib/db'
import { buttonVariants } from '@/components/ui/button'
import ChartView from '@/components/chart-view'

async function getData() {
  const { data, error } = await db
  .from('daily_usage')
  .select('date, minutesUp')
  .order('date', { ascending: true });  // Orders by date in ascending order
  
  if (error) {
    console.error('Error fetching data:', error);
  }

  return data
}

export default async function IndexPage() {
  const data = await getData()
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Sandbox Usage History <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          The data is retrieved from the database and displayed in the chart below.
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
