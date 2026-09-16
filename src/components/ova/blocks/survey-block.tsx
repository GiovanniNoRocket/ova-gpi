'use client'

import { useState } from 'react'
import { CheckCircle2, CheckSquare, MessageSquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { SurveyBlockData } from '@/types/content-blocks'

export function SurveyBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
}: {
  data: SurveyBlockData
  progress: { selectedIds?: string[] } | null
  completed: boolean
  pending: boolean
  onSubmit: (selectedIds: string[]) => void
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>(progress?.selectedIds ?? [])
  const maxSelections = data.maxSelections ?? 1

  function handleToggle(id: string) {
    if (completed || pending) return

    if (maxSelections === 1) {
      setSelectedIds([id])
      return
    }

    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id))
    } else if (selectedIds.length < maxSelections) {
      setSelectedIds([...selectedIds, id])
    }
  }

  function handleSubmit() {
    if (selectedIds.length === 0 || pending) return
    onSubmit(selectedIds)
  }

  return (
    <Card className="border-sky-500/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
            <CheckSquare className="h-4 w-4" />
            Diagnóstico / Intereses
          </div>
          {data.pointsAwarded && (
            <span className="rounded-full bg-sky-500/10 px-2.5 py-0.5 text-xs font-bold text-sky-600 dark:text-sky-400">
              +{data.pointsAwarded} XP
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-sm text-muted-foreground">{data.question}</p>
        {maxSelections > 1 && (
          <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
            Puedes seleccionar hasta {maxSelections} opciones ({selectedIds.length}/{maxSelections})
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {data.options.map((option) => {
            const isSelected = selectedIds.includes(option.id)

            return (
              <button
                key={option.id}
                type="button"
                disabled={completed || pending}
                onClick={() => handleToggle(option.id)}
                className={cn(
                  'flex items-center gap-3 rounded-lg border p-3.5 text-left text-sm transition-all',
                  isSelected
                    ? 'border-sky-500 bg-sky-500/10 font-semibold text-foreground dark:border-sky-400'
                    : 'hover:border-border/80 hover:bg-muted/40',
                )}
              >
                <div
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                    maxSelections === 1 && 'rounded-full',
                    isSelected
                      ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-900'
                      : 'border-muted-foreground/40',
                  )}
                >
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
                <span className="leading-snug">{option.text}</span>
              </button>
            )
          })}
        </div>

        {completed && data.feedback && (
          <div className="flex items-start gap-3 rounded-lg border border-sky-500/20 bg-sky-500/5 p-4 text-sm">
            <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
            <div>
              <p className="font-semibold text-sky-900 dark:text-sky-200">Retroalimentación:</p>
              <p className="mt-1 leading-relaxed text-foreground/90">{data.feedback}</p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t pt-4">
          {completed ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              Respuesta registrada en tu perfil
            </div>
          ) : (
            <Button onClick={handleSubmit} disabled={selectedIds.length === 0 || pending}>
              {pending ? 'Guardando…' : 'Confirmar respuesta'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
