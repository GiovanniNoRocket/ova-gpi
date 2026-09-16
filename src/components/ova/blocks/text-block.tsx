'use client'

import { BookOpen, CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { TextBlockData } from '@/types/content-blocks'

export function TextBlock({
  data,
  completed,
  pending,
  onComplete,
}: {
  data: TextBlockData
  completed: boolean
  pending: boolean
  onComplete: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
          <BookOpen className="h-4 w-4" />
          Lectura
        </div>
        {data.heading && <h2 className="text-xl font-semibold">{data.heading}</h2>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
          {data.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {completed ? (
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            Lección completada
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
