'use client'

import { useState } from 'react'
import { CheckCircle2, Layers, Sparkles } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ScenarioBlockData } from '@/types/content-blocks'

export function ScenarioBlock({
  data,
  progress,
  pending,
  onSubmit,
}: {
  data: ScenarioBlockData
  progress: { selectedChoiceId?: string; isOptimal?: boolean } | null
  pending: boolean
  onSubmit: (choiceId: string) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(progress?.selectedChoiceId ?? null)
  const answered = progress != null
  const selectedChoice = data.choices.find((choice) => choice.id === selectedId)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
          <Layers className="h-4 w-4" />
          Escenario
        </div>
        <h2 className="text-xl font-semibold">{data.title}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
      <p className="rounded-lg bg-muted p-3 text-sm text-foreground/90">{data.situation}</p>

      <div className="space-y-2">
        {data.choices.map((choice) => {
          const isSelected = selectedId === choice.id
          return (
            <button
              key={choice.id}
              type="button"
              disabled={answered || pending}
              onClick={() => setSelectedId(choice.id)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                isSelected && !answered && 'border-primary bg-primary/5',
                !isSelected && !answered && 'hover:bg-muted/50',
                answered &&
                  isSelected &&
                  choice.isOptimal &&
                  'border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200',
                answered &&
                  isSelected &&
                  !choice.isOptimal &&
                  'border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200',
              )}
            >
              <span>{choice.text}</span>
              {answered && isSelected && choice.isOptimal && (
                <Sparkles className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              )}
            </button>
          )
        })}
      </div>

      {answered && selectedChoice && (
        <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          {selectedChoice.feedback}
        </p>
      )}

      {answered ? (
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          Escenario completado
        </div>
      ) : (
        <Button onClick={() => selectedId && onSubmit(selectedId)} disabled={!selectedId || pending}>
          {pending ? 'Guardando…' : 'Elegir esta opción'}
        </Button>
      )}
      </CardContent>
    </Card>
  )
}
