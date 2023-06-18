import Link from "next/link"
import { CalendarCheck, Pause, ChevronDown } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

export default function DetailStatus( { data } ) {
  return (
    <Card className="max-w-[50%]">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
      <div className="space-y-1">
        <CardTitle>{data.realm.toUpperCase()}</CardTitle>
        <CardDescription>
          {data.instance}
        </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3">
            Links
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2">
                <ChevronDown className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Sandbox Links</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span><Link href={data.links.bm} rel="noopener noreferrer" target="_blank">Business Manager</Link></span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span><Link href={data.links.impex} rel="noopener noreferrer" target="_blank">Impex</Link></span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span><Link href={data.links.logs} rel="noopener noreferrer" target="_blank">Logs</Link></span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="grid gap-1 p-1.5">
        <div className="flex items-center space-x-4 rounded-md p-2 hover:bg-accent hover:text-accent-foreground">
          <Pause className="h-5 w-5" />
          <Label htmlFor="state" className="flex grow flex-col space-y-1">
            <span>State</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Shows the sandbox active or not
            </span>
          </Label>
          <Switch
          id="state"
            checked={data.state == 'started' ? true : false }
            disabled
            aria-readonly
            />
        </div>
        <div className="flex items-center space-x-4 rounded-md p-2  hover:bg-accent hover:text-accent-foreground">
          <CalendarCheck className="h-5 w-5" />
          <Label htmlFor="autoScheduled" className="flex grow flex-col space-y-1">
            <span>Auto Scheduled</span>
            <span className="font-normal leading-snug text-muted-foreground">
              Auto Scheduled for being cost effective
            </span>
          </Label>
          <Switch
          id="autoScheduled"
            checked={data.autoScheduled}
            disabled
            aria-readonly
            />
        </div>
      </CardContent>
    </Card>
  )
}