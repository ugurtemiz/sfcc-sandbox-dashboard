import {
  SandboxOperationsResponse,
  SandboxOperationsResponseData,
} from '@/types/sandbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function OperationsTable({
  data,
}: {
  data: SandboxOperationsResponse
}) {
  return (
    <Table>
      <TableCaption>A list of sandbox operations.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Operation</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((operation: SandboxOperationsResponseData) => (
          <TableRow key={operation.id}>
            <TableCell className="font-medium">{operation.id}</TableCell>
            <TableCell>{operation.operation}</TableCell>
            <TableCell>{operation.operationState}</TableCell>
            <TableCell>{operation.status}</TableCell>
            <TableCell>{operation.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
