'use client'

import { useState } from 'react'
import { Bot, Check, CheckCircle2, Copy, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import type { AiPromptLabBlockData } from '@/types/content-blocks'

export function AiPromptLabBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
}: {
  data: AiPromptLabBlockData
  progress: { reflections?: Record<string, string> } | null
  completed: boolean
  pending: boolean
  onSubmit: (reflections: Record<string, string>) => void
}) {
  const [copied, setCopied] = useState(false)
  const [reflections, setReflections] = useState<Record<string, string>>(
    progress?.reflections ?? {},
  )

  function handleCopy() {
    navigator.clipboard.writeText(data.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleReflectionChange(questionIndex: number, text: string) {
    setReflections((prev) => ({
      ...prev,
      [`q_${questionIndex}`]: text,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(reflections)
  }

  const hasAnswered = data.reflectionQuestions.some(
    (_, idx) => (reflections[`q_${idx}`]?.trim()?.length ?? 0) > 0,
  )

  return (
    <Card className="border-indigo-500/25 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            <Bot className="h-4 w-4" />
            IA Aplicada · Laboratorio de Prompts
          </div>
          {data.pointsAwarded && (
            <span className="rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              +{data.pointsAwarded} XP
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold">{data.title}</h2>
        {data.role && (
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            Rol asignado a la IA: <span className="font-normal italic text-foreground">{data.role}</span>
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* CAJA DE PROMPT DESTACADA */}
        <div className="rounded-xl border border-indigo-500/20 bg-muted/40 p-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Prompt para probar en una IA
            </span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="h-8 gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 dark:text-indigo-300 dark:hover:text-indigo-100"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ¡Copiado al portapapeles!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copiar Prompt
                </>
              )}
            </Button>
          </div>

          <div className="rounded-lg border bg-background p-3.5 font-mono text-sm leading-relaxed text-foreground/90">
            &ldquo;{data.prompt}&rdquo;
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>Copia y pega este prompt en ChatGPT, Claude, Copilot o Gemini.</span>
            <a
              href="https://chatgpt.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Abrir ChatGPT <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* GUÍA DE ANÁLISIS CRÍTICO */}
        {data.guidance && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/90">
            <p className="font-semibold text-primary">Indicación clave para el análisis:</p>
            <p className="mt-1 leading-relaxed">{data.guidance}</p>
          </div>
        )}

        {/* PREGUNTAS DE REFLEXIÓN GUIADA */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm font-semibold">Reflexión y Análisis Crítico:</p>

          {data.reflectionQuestions.map((question, idx) => (
            <div key={idx} className="space-y-1.5">
              <label className="text-xs font-medium text-foreground/90">
                {idx + 1}. {question}
              </label>
              <textarea
                rows={2}
                disabled={completed || pending}
                value={reflections[`q_${idx}`] ?? ''}
                onChange={(e) => handleReflectionChange(idx, e.target.value)}
                placeholder="Escribe tu observación crítica aquí..."
                className="w-full rounded-md border border-input bg-background p-2.5 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
              />
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4">
            {completed ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                Reflexión de IA registrada
              </div>
            ) : (
              <Button type="submit" disabled={!hasAnswered || pending}>
                {pending ? 'Guardando…' : 'Guardar análisis'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
