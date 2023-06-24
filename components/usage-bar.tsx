import { Card, Flex, ProgressBar, Text } from '@tremor/react'

import { SandboxStorageValues } from '@/types/sandbox'

export default function StorageBar({ data }: { data: SandboxStorageValues }) {
  const { spaceTotal, spaceUsed, percentageUsed } = data
  const color =
    percentageUsed < 33 ? 'teal' : percentageUsed < 66 ? 'amber' : 'red'
  return (
    <Card className="mx-auto max-w-sm">
      <Flex>
        <Text>
          {spaceUsed} MB &bull; {percentageUsed}%
        </Text>
        <Text>{spaceTotal} MB</Text>
      </Flex>
      <ProgressBar value={percentageUsed} color={color} className="mt-3" />
    </Card>
  )
}
