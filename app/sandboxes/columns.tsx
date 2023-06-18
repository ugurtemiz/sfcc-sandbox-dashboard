"use client"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" 
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      if (row.getValue("state") === 'stopped') {
        return <Badge variant='destructive'>stopped</Badge>
      }
      return <Badge>{row.getValue("state")}</Badge>
    },
  },
  {
    accessorKey: "instance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Instance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const instanceValue = row.getValue("instance");
      const instanceID = row.original.id;

      return <Link href={`sandboxes/${instanceID}`}>
        {instanceValue}
      </Link>
    },
  },
  {
    accessorKey: "autoScheduled",
    header: "Auto Scheduled",
    cell: ({ row }) => {
      if (row.getValue("autoScheduled")) {
        return <Badge>true</Badge>
      }
      return <Badge variant="outline">false</Badge>
    },
  },
  {
    accessorKey: "resourceProfile",
    header: "Resource Profile"
  },
  {
    accessorKey: "bmLink",
    header: "BM Link",
    cell: ({ row }) => {
    return <Button variant="outline" asChild>
      <Link href={row.getValue('bmLink')} rel="noopener noreferrer" target="_blank">BM Link</Link>
    </Button>
    },
  },
]
