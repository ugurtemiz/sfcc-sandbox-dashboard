import DashboardExample from '@/components/Dashboard';
import { db } from '@/utils/db';

async function getData() {
  const result = await db.execute('SELECT * FROM daily_usage ORDER BY DATE ASC;');

  return result.rows;
}

export default async function Home() {
  const data = await getData();

  return (
    <DashboardExample data={data}/>
  );
}
