'use client'

import { Award, Flame, Lock, Star, Trophy, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { levelForPoints, pointsToNextLevel } from '@/lib/gamification'
import { cn } from '@/lib/utils'

import type { AchievementSummary, GamificationSummary } from './types'

export function GamificationPanel({
  gamification,
  achievements,
  onClose,
}: {
  gamification: GamificationSummary
  achievements: AchievementSummary[]
  onClose: () => void
}) {
  const level = levelForPoints(gamification.points)
  const levelInfo = pointsToNextLevel(gamification.points)
  const earnedCount = achievements.filter((a) => a.earnedAt).length

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4" onClick={onClose}>
      <div
        className="mt-16 w-full max-w-sm rounded-xl border bg-background p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Tu progreso</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border p-3">
            <Trophy className="mx-auto h-5 w-5 text-amber-500" />
            <p className="mt-1 text-lg font-bold">{gamification.points}</p>
            <p className="text-xs text-muted-foreground">puntos</p>
          </div>
          <div className="rounded-lg border p-3">
            <Star className="mx-auto h-5 w-5 text-violet-500" />
            <p className="mt-1 text-lg font-bold">{level}</p>
            <p className="text-xs text-muted-foreground">nivel</p>
          </div>
          <div className="rounded-lg border p-3">
            <Flame className="mx-auto h-5 w-5 text-orange-500" />
            <p className="mt-1 text-lg font-bold">{gamification.streak}</p>
            <p className="text-xs text-muted-foreground">racha</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Nivel {level}</span>
            <span>Nivel {level + 1}</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${levelInfo.progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {Math.round(levelInfo.current)}/{levelInfo.next} pts para el siguiente nivel
          </p>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold">
            Logros ({earnedCount}/{achievements.length})
          </p>
          <div className="space-y-2">
            {achievements.map((achievement) => {
              const earned = achievement.earnedAt != null
              return (
                <div
                  key={achievement.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg border p-3',
                    earned
                      ? 'border-emerald-500/40 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-200'
                      : 'opacity-60',
                  )}
                >
                  {earned ? (
                    <Award className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      +{achievement.points} pts
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
