'use client'

import { useEffect, useState } from 'react'
import { Award, Sparkles, Star, Trophy, X } from 'lucide-react'

import { cn } from '@/lib/utils'

export type RewardToastData = {
  points: number
  achievement?: { key: string; title: string; points: number }
  levelUp?: number
}

export function RewardToast({
  reward,
  onClose,
  onOpenAchievements,
}: {
  reward: RewardToastData | null
  onClose: () => void
  onOpenAchievements: () => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reward) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300)
      }, 4500)
      return () => clearTimeout(timer)
    } else {
      setVisible(false)
    }
  }, [reward, onClose])

  if (!reward) return null

  const isLevelUp = reward.levelUp != null
  const isAchievement = reward.achievement != null

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-50 w-full max-w-sm transition-all duration-300 ease-out',
        visible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-4 opacity-0 scale-95 pointer-events-none',
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl transition-all',
          isLevelUp
            ? 'border-violet-500/40 bg-card/95 shadow-violet-500/10'
            : isAchievement
              ? 'border-amber-500/40 bg-card/95 shadow-amber-500/10'
              : 'border-emerald-500/40 bg-card/95 shadow-emerald-500/10',
        )}
      >
        {/* Glow background accent */}
        <div
          className={cn(
            'pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full blur-2xl',
            isLevelUp
              ? 'bg-violet-500/20'
              : isAchievement
                ? 'bg-amber-500/20'
                : 'bg-emerald-500/20',
          )}
        />

        <div className="flex items-start gap-3.5">
          {/* Icon Badge */}
          <div
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-bold shadow-sm',
              isLevelUp
                ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
                : isAchievement
                  ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
            )}
          >
            {isLevelUp ? (
              <Star className="h-6 w-6 animate-pulse" />
            ) : isAchievement ? (
              <Award className="h-6 w-6" />
            ) : (
              <Trophy className="h-6 w-6" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pr-4">
            {isLevelUp ? (
              <>
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  ¡Subiste de Nivel!
                </div>
                <p className="mt-0.5 text-sm font-extrabold text-foreground">
                  Alcanzaste el Nivel {reward.levelUp}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  +{reward.points} pts acumulados. ¡Sigue así!
                </p>
              </>
            ) : isAchievement ? (
              <>
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  ¡Nuevo Logro Desbloqueado!
                </div>
                <p className="mt-0.5 text-sm font-extrabold text-foreground">
                  {reward.achievement?.title}
                </p>
                <button
                  type="button"
                  onClick={onOpenAchievements}
                  className="mt-1 text-xs font-medium text-amber-600 underline-offset-2 hover:underline dark:text-amber-400"
                >
                  Ver vitrina de logros →
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  ¡Excelente trabajo!
                </div>
                <p className="mt-0.5 text-sm font-extrabold text-foreground">
                  +{reward.points} puntos obtenidos
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Tu progreso ha sido guardado con éxito.
                </p>
              </>
            )}
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={() => {
              setVisible(false)
              setTimeout(onClose, 300)
            }}
            className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Cerrar notificación"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic timer bar at bottom */}
        <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-muted/60">
          <div
            className={cn(
              'h-full rounded-full transition-all ease-linear',
              isLevelUp ? 'bg-violet-500' : isAchievement ? 'bg-amber-500' : 'bg-emerald-500',
              visible ? 'w-0 duration-[4500ms]' : 'w-full',
            )}
          />
        </div>
      </div>
    </div>
  )
}
