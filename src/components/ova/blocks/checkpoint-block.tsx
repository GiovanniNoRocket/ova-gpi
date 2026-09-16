'use client'

import { CheckCircle2, Flag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { CheckpointBlockData } from '@/types/content-blocks'

export function CheckpointBlock({
  data,
  completed,
  pending,
  onComplete,
}: {
  data: CheckpointBlockData
  completed: boolean
  pending: boolean
  onComplete: () => void
}) {
  return (
    <Card className="border-amber-500/40">
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
          <Flag className="h-4 w-4" />
          Checkpoint
        </div>
        <h2 className="text-xl font-semibold">{data.title}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/90">{data.description}</p>

        <ul className="space-y-2">
          {data.criteria.map((criterion, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{criterion}</span>
            </li>
          ))}
        </ul>

        {completed ? (
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Checkpoint completado
          </div>
        ) : (
          <Button onClick={onComplete} disabled={pending}>
            {pending ? 'Guardando…' : 'Marcar como completado'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
