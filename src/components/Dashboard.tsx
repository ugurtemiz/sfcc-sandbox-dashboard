'use client';

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from '@tremor/react';
import ChartView from './ChartView';
import { constrainedMemory } from 'process';

export default function DashboardExample({ data }) {

  return (
    <main className="px-12 py-12">
      <Title>Sandbox Usage Dashboard</Title>
      <Text>Monitor your sandbox usage and your budget</Text>

      <TabGroup className="mt-6">
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <ChartView data={data}/>
              </Card>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-6">
              <Card>
                <div className="h-96" />
              </Card>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}