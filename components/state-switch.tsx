'use client'

import { useState } from 'react'
import { Pause } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function StateSwitch({
  state,
  sandboxId,
}: {
  state: string
  sandboxId: string
}) {
  const [sandboxState, setSandboxState] = useState(
    state == 'started' ? true : false
  )

  function stateChangeHandler(value: boolean) {
    console.log(value)
    const url = `/api/sandboxes/${sandboxId}`
    const data = { operation: 'start' }
    if (!value) {
      data.operation = 'stop'
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(({ status }) => {
        if (status == 'Success') {
          setSandboxState(value)
        }
      })
  }

  return (
    <>
      <Pause className="h-5 w-5" />
      <Label htmlFor="state" className="flex grow flex-col space-y-1">
        <span>State</span>
        <span className="font-normal leading-snug text-muted-foreground">
          Shows the sandbox active or not
        </span>
      </Label>
      <Switch
        id="state"
        checked={sandboxState}
        onCheckedChange={(value) => stateChangeHandler(value)}
        aria-readonly
      />
    </>
  )
}
