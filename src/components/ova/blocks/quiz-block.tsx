'use client'

import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle2, HelpCircle, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { QuizBlockData } from '@/types/content-blocks'
import { renderInlineFormatted } from '../formatted-text'

function cleanExplanation(text?: string): string {
  if (!text) return ''
  return text.replace(/^(¡?(?:Correcto|Exacto|Gran trabajo|Excelente)[.!]?\s*)/i, '').trim()
}

export function QuizBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
}: {
  data: QuizBlockData
  progress: { selectedOptionId?: string; correct?: boolean } | null
  completed: boolean
  pending: boolean
  onSubmit: (optionId: string) => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(progress?.selectedOptionId ?? null)

  useEffect(() => {
    if (progress?.selectedOptionId) {
      setSelectedId(progress.selectedOptionId)
    }
  }, [progress?.selectedOptionId])

  const showResult = progress != null
  const isCorrect = completed || progress?.correct === true
  const isFailed = showResult && !isCorrect
  const submittedOption = data.options.find((o) => o.id === progress?.selectedOptionId)
  const isDirty = selectedId !== progress?.selectedOptionId

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400">
          <HelpCircle className="h-4 w-4" />
          Pregunta de autoevaluación
        </div>
        <h2 className="text-xl font-semibold leading-snug">{renderInlineFormatted(data.question)}</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {data.options.map((option) => {
            const isSelected = selectedId === option.id
            const wasSubmitted = progress?.selectedOptionId === option.id
            const isCorrectOption = isCorrect && option.isCorrect
            const isWrongSelection = showResult && wasSubmitted && !option.isCorrect

            return (
              <button
                key={option.id}
                type="button"
                disabled={completed || pending}
                onClick={() => setSelectedId(option.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors',
                  isSelected && !isCorrect && 'border-primary bg-primary/5 font-medium',
                  !isSelected && !isCorrectOption && !isWrongSelection && 'hover:bg-muted/50',
                  isCorrectOption &&
                    'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium dark:bg-emerald-950/40 dark:text-emerald-200',
                  isWrongSelection &&
                    'border-destructive bg-destructive/5 text-destructive font-medium dark:bg-destructive/20 dark:text-destructive',
                )}
              >
                <span>{renderInlineFormatted(option.text)}</span>
                {isCorrectOption && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                )}
                {isWrongSelection && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
              </button>
            )
          })}
        </div>

        {/* Feedback Area */}
        {isCorrect && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-2 text-sm dark:bg-emerald-950/30">
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>¡Respuesta correcta!</span>
            </div>
            {data.explanation && (
              <p className="text-muted-foreground leading-relaxed">
                {renderInlineFormatted(cleanExplanation(data.explanation))}
              </p>
            )}
          </div>
        )}

        {isFailed && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 space-y-2 text-sm dark:bg-destructive/950/30">
            <div className="flex items-center gap-2 font-bold text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Respuesta incorrecta</span>
            </div>
            {submittedOption && (
              <p className="text-xs text-muted-foreground">
                Seleccionaste: <span className="font-semibold text-foreground">&ldquo;{submittedOption.text}&rdquo;</span>
              </p>
            )}
            {data.explanation && (
              <p className="text-muted-foreground leading-relaxed pt-1">
                <strong className="text-foreground font-semibold">Explicación: </strong>
                {cleanExplanation(data.explanation)}
              </p>
            )}
            <p className="text-xs font-semibold text-foreground/80 pt-1">
              💡 Selecciona otra opción arriba y presiona &ldquo;Reintentar&rdquo;.
            </p>
          </div>
        )}

        {/* Action Button */}
        {completed ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 pt-1">
            <CheckCircle2 className="h-4 w-4" />
            Pregunta superada
          </div>
        ) : (
          <Button
            onClick={() => selectedId && onSubmit(selectedId)}
            disabled={!selectedId || pending || (showResult && !isDirty)}
            className="font-medium"
          >
            {pending ? 'Enviando…' : showResult ? (isDirty ? 'Comprobar nueva opción' : 'Reintentar') : 'Responder'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
