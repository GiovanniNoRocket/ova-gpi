'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ExamBlockData } from '@/types/content-blocks'

export function ExamBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
}: {
  data: ExamBlockData
  progress: {
    score?: number
    passed?: boolean
    answers?: Record<number, string>
  } | null
  completed: boolean
  pending: boolean
  onSubmit: (result: { score: number; passed: boolean; answers: Record<number, string> }) => void
}) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>(progress?.answers ?? {})
  const [showConfirm, setShowConfirm] = useState(false)
  const [reviewMode, setReviewMode] = useState(completed || progress?.passed != null)

  const questions = data.questions
  const currentQ = questions[currentIdx]
  const answeredCount = Object.keys(answers).length
  const totalCount = questions.length

  function handleSelectOption(qId: number, optionId: string) {
    if (reviewMode || pending) return
    setAnswers((prev) => ({
      ...prev,
      [qId]: optionId,
    }))
  }

  function handleGradeExam() {
    let correctCount = 0
    for (const q of questions) {
      if (answers[q.id] === q.correctOptionId) {
        correctCount++
      }
    }

    const calculatedScore = Math.round((correctCount / totalCount) * 100)
    const passed = calculatedScore >= data.passingScore

    setShowConfirm(false)
    setReviewMode(true)
    onSubmit({
      score: calculatedScore,
      passed,
      answers,
    })
  }

  const score = progress?.score ?? 0
  const passed = progress?.passed ?? score >= data.passingScore

  return (
    <Card className="border-primary/30 shadow-md">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            <GraduationCap className="h-4 w-4" />
            Evaluación Final · Nivel 1 (25 preguntas · 100 pts)
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              Mínimo aprobatorio: {data.passingScore}%
            </span>
          </div>
        </div>
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p className="text-sm text-muted-foreground">{data.description}</p>

        {/* BARRA DE RESULTADOS SI YA SE COMPLETÓ O EVALUÓ */}
        {reviewMode && (
          <div
            className={cn(
              'mt-3 rounded-xl border p-4 transition-all',
              passed
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200'
                : 'border-amber-500/40 bg-amber-500/10 text-amber-950 dark:text-amber-200',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {passed ? (
                  <Trophy className="h-8 w-8 text-amber-500" />
                ) : (
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                )}
                <div>
                  <h3 className="text-lg font-bold">
                    {passed ? '¡Felicitaciones! Has aprobado el Nivel 1' : 'Puntaje obtenido:'}
                  </h3>
                  <p className="text-xs opacity-90">
                    Calificación: <span className="font-extrabold text-base">{score} / 100 puntos</span> (
                    {Math.round(score / (data.pointsPerQuestion ?? 4))} de {totalCount} preguntas correctas)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {passed ? (
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white">
                    <Award className="h-4 w-4" /> Insignia obtenida
                  </span>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setReviewMode(false)
                      setAnswers({})
                      setCurrentIdx(0)
                    }}
                  >
                    <RotateCcw className="mr-1 h-3.5 w-3.5" /> Reintentar
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PALETA NAVEGADORA DE LAS 25 PREGUNTAS */}
        <div className="pt-2">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>Preguntas del examen:</span>
            <span>
              {answeredCount}/{totalCount} respondidas
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIdx
              const isAnswered = answers[q.id] != null
              const isCorrectInReview = reviewMode && answers[q.id] === q.correctOptionId
              const isWrongInReview = reviewMode && isAnswered && answers[q.id] !== q.correctOptionId

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded text-xs font-semibold transition-all',
                    isCurrent && 'ring-2 ring-primary ring-offset-1',
                    reviewMode && isCorrectInReview && 'bg-emerald-600 text-white',
                    reviewMode && isWrongInReview && 'bg-destructive text-white',
                    reviewMode && !isAnswered && 'bg-muted text-muted-foreground',
                    !reviewMode && isAnswered && 'bg-primary/20 font-bold text-primary',
                    !reviewMode && !isAnswered && 'bg-muted/70 text-muted-foreground hover:bg-muted',
                  )}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* PREGUNTA ACTUAL */}
        {currentQ && (
          <div className="rounded-xl border bg-muted/20 p-5">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span>PREGUNTA {currentIdx + 1} DE {totalCount}</span>
              <span>Valor: {data.pointsPerQuestion ?? 4} pts</span>
            </div>

            {currentQ.scenario && (
              <div className="mb-3 rounded-lg border bg-background p-3 text-xs leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">Contexto: </span>
                {currentQ.scenario}
              </div>
            )}

            <h3 className="text-base font-semibold leading-relaxed text-foreground">
              {currentQ.question}
            </h3>

            {/* OPCIONES DE RESPUESTA */}
            <div className="mt-4 space-y-2">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.id
                const isCorrectOption = reviewMode && opt.id === currentQ.correctOptionId
                const isWrongSelection = reviewMode && isSelected && !isCorrectOption

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={reviewMode || pending}
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg border p-3.5 text-left text-sm transition-all',
                      isSelected && !reviewMode && 'border-primary bg-primary/10 font-semibold',
                      !isSelected && !reviewMode && 'hover:bg-muted/50',
                      isCorrectOption && 'border-emerald-500 bg-emerald-500/10 font-semibold text-emerald-950 dark:text-emerald-200',
                      isWrongSelection && 'border-destructive bg-destructive/10 text-destructive',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold uppercase">
                        {opt.id}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </div>

                    {isCorrectOption && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {isWrongSelection && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
                  </button>
                )
              })}
            </div>

            {/* EXPLICACIÓN EN MODO REVISIÓN */}
            {reviewMode && currentQ.explanation && (
              <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3.5 text-xs">
                <p className="font-semibold text-primary">Explicación técnica:</p>
                <p className="mt-1 leading-relaxed text-foreground/90">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* NAVEGACIÓN INFERIOR Y ENTREGA */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Anterior
          </Button>

          <div className="flex items-center gap-2">
            {!reviewMode && (
              <Button
                onClick={() => setShowConfirm(true)}
                disabled={answeredCount === 0 || pending}
                className="font-bold"
              >
                Entregar examen ({answeredCount}/{totalCount})
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIdx((prev) => Math.min(totalCount - 1, prev + 1))}
              disabled={currentIdx === totalCount - 1}
            >
              Siguiente <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* MODAL DE CONFIRMACIÓN ANTES DE ENTREGAR */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl">
              <h3 className="text-lg font-bold">¿Deseas entregar tu evaluación?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Has respondido <span className="font-bold text-foreground">{answeredCount}</span> de{' '}
                <span className="font-bold text-foreground">{totalCount}</span> preguntas.
                {answeredCount < totalCount && (
                  <span className="block mt-1 text-amber-600 dark:text-amber-400 font-medium">
                    ⚠️ Tienes {totalCount - answeredCount} preguntas sin responder.
                  </span>
                )}
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowConfirm(false)}>
                  Continuar respondiendo
                </Button>
                <Button onClick={handleGradeExam} disabled={pending}>
                  {pending ? 'Calificando…' : 'Sí, calificar ahora'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
