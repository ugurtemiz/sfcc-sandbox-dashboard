'use client';

import { InformationCircleIcon } from '@heroicons/react/solid';
import { Flex, Title, Icon, TabGroup, TabList, Tab, AreaChart, Text, Color } from '@tremor/react';
import { useState } from 'react';

const formatters: { [key: string]: any } = {
  minutesUp: (number: number) => `${Math.floor(number/60)} hr`
};

const Kpis = {
  minutesUp: 'minutesUp'
};

const kpiList = [Kpis.minutesUp];

export default function ChartView({data}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedKpi = kpiList[selectedIndex];

  const areaChartArgs = {
    className: 'mt-5 h-72',
    data: data,
    index: 'date',
    categories: [selectedKpi],
    colors: ['blue'] as Color[],
    showLegend: false,
    valueFormatter: formatters[selectedKpi],
    yAxisWidth: 56,
  };

  return (
    <>
      <div className="justify-between md:flex">
        <div>
          <Flex className="space-x-0.5" justifyContent="start" alignItems="center">
            <Title> Usage History </Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Shows daily increase or decrease of realm usage"
            />
          </Flex>
          <Text> Daily usage per realm   </Text>
        </div>
        <div>
          <TabGroup index={selectedIndex} onIndexChange={setSelectedIndex}>
            <TabList color="gray" variant="solid">
              <Tab>Minutes Up</Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      {/* web */}
      <div className="mt-8 hidden sm:block">
        <AreaChart {...areaChartArgs} />
      </div>
      {/* mobile */}
      <div className="mt-8 sm:hidden">
        <AreaChart {...areaChartArgs} startEndOnly={true} showGradient={false} showYAxis={false} />
      </div>
    </>
  );
}