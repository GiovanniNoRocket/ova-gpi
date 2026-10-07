'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  Trophy,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { MinigameBlockData } from '@/types/content-blocks'

export function MinigameBlock({
  data,
  progress,
  completed,
  pending,
  onSubmit,
}: {
  data: MinigameBlockData
  progress: { score?: number; answers?: Record<string, unknown> } | null
  completed: boolean
  pending: boolean
  onSubmit: (gameData: Record<string, unknown>) => void
}) {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0)
  const [roundAnswers, setRoundAnswers] = useState<Record<number, { choice: string; justId?: string }>>(
    (progress?.answers?.confidenceRounds as Record<number, { choice: string; justId?: string }>) ?? {},
  )
  const [revealedRounds, setRevealedRounds] = useState<Record<number, boolean>>({})

  const [foundTargetIds, setFoundTargetIds] = useState<string[]>(
    (progress?.answers?.foundTargets as string[]) ?? [],
  )

  const [cardPlacements, setCardPlacements] = useState<Record<string, string>>(
    (progress?.answers?.cardPlacements as Record<string, string>) ?? {},
  )

  if (data.gameType === 'CONFIDENCE_ROUNDS' && data.rounds && data.rounds.length > 0) {
    const rounds = data.rounds
    const round = rounds[currentRoundIdx]
    const roundAns = roundAnswers[round.roundNumber]
    const isRevealed = revealedRounds[round.roundNumber] || completed
    const allRoundsAnswered = rounds.every((r) => roundAnswers[r.roundNumber] != null)

    const CONFIDENCE_OPTIONS = [
      { id: 'RESPALDADA', label: '🟢 Respaldada por la información', color: 'border-emerald-500 bg-emerald-500/10' },
      { id: 'VERIFICAR', label: '🟡 Necesita verificación', color: 'border-amber-500 bg-amber-500/10' },
      { id: 'SIN_EVIDENCIA', label: '🔴 No existe evidencia suficiente', color: 'border-destructive bg-destructive/10' },
    ]

    function handleConfidenceChoice(val: 'RESPALDADA' | 'VERIFICAR' | 'SIN_EVIDENCIA') {
      if (completed || pending) return
      setRoundAnswers((prev) => ({
        ...prev,
        [round.roundNumber]: {
          ...prev[round.roundNumber],
          choice: val,
        },
      }))
    }

    function handleJustificationChoice(id: string) {
      if (completed || pending) return
      setRoundAnswers((prev) => ({
        ...prev,
        [round.roundNumber]: {
          ...prev[round.roundNumber],
          justId: id,
        },
      }))
      setRevealedRounds((prev) => ({ ...prev, [round.roundNumber]: true }))
    }

    function handleNextRound() {
      if (currentRoundIdx < rounds.length - 1) {
        setCurrentRoundIdx((prev) => prev + 1)
      } else if (allRoundsAnswered) {
        onSubmit({ confidenceRounds: roundAnswers })
      }
    }

    const isChoiceCorrect = roundAns?.choice === round.correctAnswer

    return (
      <Card className="border-amber-500/30 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              <Trophy className="h-4 w-4" />
              Minijuego Especial · Rondas de Detección
            </div>
            {data.badgeKey && (
              <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Award className="h-3.5 w-3.5" /> Insignia en juego: {data.badgeKey}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm text-muted-foreground">{data.description}</p>

          {/* INDICADOR DE RONDAS */}
          <div className="flex items-center gap-2 pt-2">
            {rounds.map((r, idx) => {
              const isAnswered = roundAnswers[r.roundNumber] != null
              const isCurrent = idx === currentRoundIdx
              return (
                <button
                  key={r.roundNumber}
                  type="button"
                  onClick={() => setCurrentRoundIdx(idx)}
                  className={cn(
                    'h-2.5 flex-1 rounded-full transition-all',
                    isCurrent ? 'bg-amber-500 ring-2 ring-amber-500/40' : isAnswered ? 'bg-emerald-500' : 'bg-muted',
                  )}
                />
              )
            })}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-xl border bg-muted/30 p-5">
            <div className="mb-2 flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span>RETO {round.roundNumber} DE {rounds.length}</span>
              <span className="text-amber-600 dark:text-amber-400">+{round.xpAwarded ?? 30} XP</span>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border bg-background p-3 text-sm">
                <span className="font-semibold text-muted-foreground">Contexto disponible: </span>
                <span className="text-foreground">{round.context}</span>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm">
                <span className="font-semibold text-primary">Respuesta generada por la IA: </span>
                <span className="italic text-foreground">&ldquo;{round.aiResponse}&rdquo;</span>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                ¿Cómo clasificarías esta afirmación?
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                {CONFIDENCE_OPTIONS.map((opt) => {
                  const isSelected = roundAns?.choice === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={completed || pending || isRevealed}
                      onClick={() => handleConfidenceChoice(opt.id as 'RESPALDADA' | 'VERIFICAR' | 'SIN_EVIDENCIA')}
                      className={cn(
                        'rounded-lg border p-3 text-left text-xs font-medium transition-all',
                        isSelected ? opt.color + ' ring-1' : 'hover:bg-background',
                      )}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* PREGUNTA DE JUSTIFICACIÓN SI EXISTE */}
            {roundAns?.choice && round.justificationOptions && (
              <div className="mt-5 space-y-2 border-t pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Justifica tu decisión:
                </p>
                <div className="space-y-2">
                  {round.justificationOptions.map((just) => {
                    const isSelected = roundAns.justId === just.id
                    return (
                      <button
                        key={just.id}
                        type="button"
                        disabled={completed || pending || isRevealed}
                        onClick={() => handleJustificationChoice(just.id)}
                        className={cn(
                          'flex w-full items-center gap-2 rounded-lg border p-2.5 text-left text-xs transition-colors',
                          isSelected ? 'border-primary bg-primary/10 font-semibold' : 'hover:bg-background',
                        )}
                      >
                        <div className="h-2 w-2 rounded-full border border-current" />
                        <span>{just.text}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* RETROALIMENTACIÓN DE LA RONDA */}
            {isRevealed && (
              <div
                className={cn(
                  'mt-4 rounded-lg border p-4 text-xs',
                  isChoiceCorrect ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-destructive/30 bg-destructive/10',
                )}
              >
                <div className="flex items-center gap-2 font-bold">
                  {isChoiceCorrect ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <span>{isChoiceCorrect ? '¡Decisión acertada!' : 'Atención al análisis:'}</span>
                </div>
                <p className="mt-1 leading-relaxed text-foreground/90">{round.feedback}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <span className="text-xs text-muted-foreground">
              Progreso: {Object.keys(roundAnswers).length} de {rounds.length} retos analizados
            </span>

            {completed ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                ¡Minijuego completado! Insignia obtenida
              </div>
            ) : (
              <Button
                onClick={handleNextRound}
                disabled={!roundAns?.choice || (round.justificationOptions != null && !roundAns?.justId) || pending}
              >
                {currentRoundIdx < rounds.length - 1 ? (
                  <>
                    Siguiente reto <ChevronRight className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  'Finalizar minijuego'
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (data.gameType === 'ERROR_HUNTER' && data.reportAudit) {
    const audit = data.reportAudit
    const allFound = audit.targets.every((t) => foundTargetIds.includes(t.id))

    function handleToggleTarget(targetId: string) {
      if (completed || pending) return
      if (!foundTargetIds.includes(targetId)) {
        const next = [...foundTargetIds, targetId]
        setFoundTargetIds(next)
        if (next.length === audit.targets.length) {
          onSubmit({ foundTargets: next })
        }
      }
    }

    return (
      <Card className="border-rose-500/30 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-rose-600 dark:text-rose-400">
              <ShieldAlert className="h-4 w-4" />
              Minijuego · Auditoría de IA
            </div>
            <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-bold text-rose-600 dark:text-rose-400">
              Hallazgos: {foundTargetIds.length}/{audit.targets.length}
            </span>
          </div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* PANEL DE METAS DE AUDITORÍA */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-2.5 text-center">
              <span className="text-xs font-bold text-red-600 dark:text-red-400">🔴 2 Datos Inventados</span>
            </div>
            <div className="rounded-lg border border-orange-500/30 bg-orange-500/5 p-2.5 text-center">
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400">🟠 1 Contradicción</span>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5 text-center">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">🟡 1 Sin Evidencia</span>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-center">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">🟢 1 Dato Correcto</span>
            </div>
          </div>

          {/* INFORME SIMULADO */}
          <div className="space-y-4 rounded-xl border bg-muted/30 p-5 font-sans">
            <div className="border-b pb-3">
              <h3 className="text-base font-bold text-foreground">{audit.reportTitle}</h3>
              {audit.reportDate && <p className="text-xs text-muted-foreground">{audit.reportDate}</p>}
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              {audit.reportSections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    {sec.title}
                  </h4>
                  <p className="whitespace-pre-line text-foreground/90">{sec.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LISTA DE PUNTOS SOSPECHOSOS A AUDITAR */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Haz clic en los hallazgos para auditarlos:
            </p>
            <div className="space-y-2">
              {audit.targets.map((target) => {
                const isFound = foundTargetIds.includes(target.id)
                return (
                  <div
                    key={target.id}
                    className={cn(
                      'rounded-lg border p-3.5 transition-all',
                      isFound
                        ? 'border-emerald-500/50 bg-emerald-500/5'
                        : 'border-border/80 hover:border-primary/50 hover:bg-muted/40',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                            {target.location}
                          </span>
                          <span className="font-mono text-xs font-semibold text-foreground">
                            &ldquo;{target.targetText}&rdquo;
                          </span>
                        </div>
                        {isFound && (
                          <div className="mt-2 space-y-1 text-xs">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                              [{target.typeLabel}]
                            </span>
                            <p className="text-muted-foreground">{target.explanation}</p>
                          </div>
                        )}
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        variant={isFound ? 'secondary' : 'outline'}
                        disabled={isFound || completed || pending}
                        onClick={() => handleToggleTarget(target.id)}
                        className="h-8 shrink-0 text-xs"
                      >
                        {isFound ? (
                          <>
                            <CheckCircle2 className="mr-1 h-3.5 w-3.5 text-emerald-600" /> Auditado (+25 XP)
                          </>
                        ) : (
                          'Marcar hallazgo'
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            {allFound || completed ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                ¡Auditoría completada! Insignia &ldquo;Auditor de IA&rdquo; desbloqueada (+125 XP)
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                Encuentra los {audit.targets.length - foundTargetIds.length} hallazgos restantes para completar la auditoría.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (data.gameType === 'CARD_SORT' && data.cards && data.categories) {
    const cards = data.cards
    const categories = data.categories
    const allPlaced = cards.every((c) => cardPlacements[c.id] != null)

    function handlePlace(cardId: string, category: string) {
      if (completed || pending) return
      setCardPlacements((prev) => ({
        ...prev,
        [cardId]: category,
      }))
    }

    function handleFinishSort() {
      onSubmit({ cardPlacements })
    }

    return (
      <Card className="border-cyan-500/30 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
              <Sparkles className="h-4 w-4" />
              Minijuego · ¿IA sí o IA no?
            </div>
          </div>
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-sm text-muted-foreground">{data.description}</p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-3">
            {cards.map((card) => {
              const currentCat = cardPlacements[card.id]
              const isCorrect = currentCat === card.correctCategory
              const showResult = completed

              return (
                <div
                  key={card.id}
                  className={cn(
                    'flex flex-col gap-3 rounded-lg border p-3.5 sm:flex-row sm:items-center sm:justify-between',
                    showResult && isCorrect && 'border-emerald-500/50 bg-emerald-500/5',
                    showResult && !isCorrect && 'border-destructive/50 bg-destructive/5',
                  )}
                >
                  <span className="text-sm font-medium leading-relaxed">{card.text}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((cat) => {
                      const isSelected = currentCat === cat
                      return (
                        <button
                          key={cat}
                          type="button"
                          disabled={completed || pending}
                          onClick={() => handlePlace(card.id, cat)}
                          className={cn(
                            'rounded px-2.5 py-1 text-xs font-semibold transition-all',
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
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

          <div className="flex items-center justify-between border-t pt-4">
            {completed ? (
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                Decisiones clasificadas correctamente
              </div>
            ) : (
              <Button onClick={handleFinishSort} disabled={!allPlaced || pending}>
                {pending ? 'Comprobando…' : 'Validar decisiones'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}
