'use client'

import { useState } from 'react'
import { CheckCircle2, HelpCircle, RefreshCw, Sparkles, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ClassificationBlockData } from '@/types/content-blocks'

export function ClassificationBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
}: {
  data: ClassificationBlockData
  progress: { classifications?: Record<string, string>; correct?: boolean } | null
  completed: boolean
  pending: boolean
  onSubmit: (classifications: Record<string, string>) => void
}) {
  const [classifications, setClassifications] = useState<Record<string, string>>(
    progress?.classifications ?? {},
  )
  const [submitted, setSubmitted] = useState(completed || progress?.correct != null)

  const allAssigned = data.items.every((item) => classifications[item.id] != null)

  function handleAssign(itemId: string, category: string) {
    if (completed || pending) return
    setClassifications((prev) => ({
      ...prev,
      [itemId]: category,
    }))
    setSubmitted(false)
  }

  function handleCheck() {
    setSubmitted(true)
    onSubmit(classifications)
  }

  function handleReset() {
    if (completed || pending) return
    setClassifications({})
    setSubmitted(false)
  }

  return (
    <Card className="border-amber-500/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
            <Sparkles className="h-4 w-4" />
            Actividad Interactiva · Clasificación
          </div>
          {data.pointsAwarded && (
            <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              +{data.pointsAwarded} XP
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-sm text-muted-foreground">{data.instruction}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {data.items.map((item) => {
            const currentCat = classifications[item.id]
            const isCorrect = currentCat === item.category
            const showFeedback = submitted

            return (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col gap-3 rounded-lg border p-4 transition-all md:flex-row md:items-center md:justify-between',
                  showFeedback && isCorrect && 'border-emerald-500/60 bg-emerald-500/5',
                  showFeedback && !isCorrect && 'border-destructive/60 bg-destructive/5',
                )}
              >
                <div className="flex items-start gap-2.5">
                  {showFeedback && isCorrect && (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  )}
                  {showFeedback && !isCorrect && (
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                  )}
                  {!showFeedback && (
                    <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="text-sm font-medium leading-relaxed">{item.text}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {data.categories.map((cat) => {
                    const isSelected = currentCat === cat
                    return (
                      <button
                        key={cat}
                        type="button"
                        disabled={completed || pending}
                        onClick={() => handleAssign(item.id, cat)}
                        className={cn(
                          'rounded-md px-3 py-1 text-xs font-semibold transition-all',
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground',
                          showFeedback && isSelected && !isCorrect && 'bg-destructive text-destructive-foreground',
                          showFeedback && isSelected && isCorrect && 'bg-emerald-600 text-white',
                        )}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {submitted && data.explanation && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground/90">
            <p className="font-semibold text-primary">Retroalimentación pedagógica:</p>
            <p className="mt-1 leading-relaxed">{data.explanation}</p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <div className="flex items-center gap-2">
            {!completed && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={pending || Object.keys(classifications).length === 0}
              >
                <RefreshCw className="mr-1 h-3.5 w-3.5" />
                Reiniciar
              </Button>
            )}
          </div>

          {completed ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
              ¡Excelente! Actividad clasificada correctamente
            </div>
          ) : (
            <Button onClick={handleCheck} disabled={!allAssigned || pending}>
              {pending ? 'Comprobando…' : submitted ? 'Reintentar' : 'Comprobar respuestas'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
