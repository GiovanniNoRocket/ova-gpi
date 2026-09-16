'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import {
  AlertCircle,
  BookMarked,
  BookOpen,
  Bot,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flag,
  Flame,
  GraduationCap,
  HelpCircle,
  Layers,
  ListChecks,
  RotateCw,
  Sparkles,
  Star,
  Trophy,
  Video as VideoIcon,
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { logoutAction } from '@/app/actions/auth'
import { recordBlockProgressAction, type ProgressActionResult } from '@/app/actions/progress'
import { Button } from '@/components/ui/button'
import { levelForPoints, pointsToNextLevel } from '@/lib/gamification'
import { cn } from '@/lib/utils'
import type {
  CheckpointBlockData,
  QuizBlockData,
  ScenarioBlockData,
  TextBlockData,
  VideoBlockData,
} from '@/types/content-blocks'

import { BitacoraModal } from './bitacora-modal'
import { BlockRenderer } from './blocks/block-renderer'
import type { Flashcard } from './flashcard-deck'
import { FlashcardDeck } from './flashcard-deck'
import { GamificationPanel } from './gamification-panel'
import { RewardToast, type RewardToastData } from './reward-toast'
import type { AchievementSummary, CourseBlock, CourseModule, GamificationSummary } from './types'

const BLOCK_ICONS: Record<CourseBlock['type'], typeof BookOpen> = {
  TEXT: BookOpen,
  VIDEO: VideoIcon,
  QUIZ: HelpCircle,
  SCENARIO: Layers,
  CHECKPOINT: Flag,
  CLASSIFICATION: Sparkles,
  SURVEY: CheckSquare,
  PROJECT_STEP: BookMarked,
  AI_PROMPT_LAB: Bot,
  MINIGAME: Trophy,
  EXAM: GraduationCap,
}

function flashcardForBlock(block: CourseBlock, moduleTitle: string): Flashcard | null {
  switch (block.type) {
    case 'TEXT': {
      const data = block.blockData as TextBlockData
      return { id: block.id, front: data.heading || moduleTitle, back: data.content }
    }
    case 'VIDEO': {
      const data = block.blockData as VideoBlockData
      if (!data.transcript) return null
      return { id: block.id, front: data.title || 'Video', back: data.transcript }
    }
    case 'CHECKPOINT': {
      const data = block.blockData as CheckpointBlockData
      return {
        id: block.id,
        front: data.title,
        back: [data.description, ...data.criteria.map((c) => `• ${c}`)].join('\n\n'),
      }
    }
    case 'QUIZ': {
      if (block.progress?.status !== 'COMPLETED') return null
      const data = block.blockData as QuizBlockData
      const correctOption = data.options.find((option) => option.isCorrect)
      return {
        id: block.id,
        front: data.question,
        back: [correctOption?.text, data.explanation].filter(Boolean).join('\n\n'),
      }
    }
    case 'SCENARIO': {
      if (block.progress?.status !== 'COMPLETED') return null
      const data = block.blockData as ScenarioBlockData
      const optimal = data.choices.find((choice) => choice.isOptimal)
      if (!optimal) return null
      return {
        id: block.id,
        front: data.situation,
        back: [optimal.text, optimal.feedback].filter(Boolean).join('\n\n'),
      }
    }
    default:
      return null
  }
}

function blockLabel(block: CourseBlock): string {
  const data = block.blockData as Record<string, unknown>
  switch (block.type) {
    case 'TEXT':
      return (data.heading as string) || 'Lectura'
    case 'VIDEO':
      return (data.title as string) || 'Video'
    case 'QUIZ':
      return 'Pregunta rápida'
    case 'SCENARIO':
      return (data.title as string) || 'Escenario'
    case 'CHECKPOINT':
      return (data.title as string) || 'Checkpoint'
    case 'CLASSIFICATION':
      return (data.title as string) || 'Clasificación'
    case 'SURVEY':
      return (data.title as string) || 'Diagnóstico'
    case 'PROJECT_STEP':
      return typeof data.stepNumber === 'number'
        ? `Paso ${data.stepNumber}: ${(data.title as string) || 'Proyecto'}`
        : (data.title as string) || 'Proyecto Integrador'
    case 'AI_PROMPT_LAB':
      return (data.title as string) || 'IA Aplicada'
    case 'MINIGAME':
      return (data.title as string) || 'Minijuego'
    case 'EXAM':
      return (data.title as string) || 'Evaluación Final'
    default:
      return 'Lección'
  }
}

export function CoursePlayer({
  courseSlug,
  courseTitle,
  courseDescription,
  modules: initialModules,
  gamification: initialGamification,
  achievements: initialAchievements,
}: {
  courseSlug: string
  courseTitle: string
  courseDescription: string
  modules: CourseModule[]
  gamification: GamificationSummary
  achievements: AchievementSummary[]
}) {
  const [modules, setModules] = useState(initialModules)
  const [gamification, setGamification] = useState(initialGamification)
  const [achievements, setAchievements] = useState(initialAchievements)
  const [lastAward, setLastAward] = useState<{ points: number; achievementTitle?: string } | null>(
    null,
  )
  const [rewardToast, setRewardToast] = useState<RewardToastData | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [bitacoraOpen, setBitacoraOpen] = useState(false)
  const [view, setView] = useState<'lessons' | 'flashcards'>('lessons')
  const [isPending, startTransition] = useTransition()

  const flatBlocks = useMemo(() => modules.flatMap((m) => m.blocks), [modules])

  const flashcards = useMemo(
    () =>
      modules.flatMap((courseModule) =>
        courseModule.blocks
          .map((block) => flashcardForBlock(block, courseModule.title))
          .filter((card): card is Flashcard => card != null),
      ),
    [modules],
  )

  const [selectedBlockId, setSelectedBlockId] = useState<string>(
    () => flatBlocks.find((b) => b.progress?.status !== 'COMPLETED')?.id ?? flatBlocks[0]?.id,
  )
  const [errorBanner, setErrorBanner] = useState<string | null>(null)

  const selectedBlock = flatBlocks.find((b) => b.id === selectedBlockId) ?? flatBlocks[0]
  const currentIndex = flatBlocks.findIndex((b) => b.id === selectedBlock?.id)

  const totalBlocks = flatBlocks.length
  const completedCount = flatBlocks.filter((b) => b.progress?.status === 'COMPLETED').length
  const overallProgress = totalBlocks > 0 ? Math.round((completedCount / totalBlocks) * 100) : 0

  const currentModule = useMemo(() => {
    return modules.find((m) => m.blocks.some((b) => b.id === selectedBlockId))
  }, [modules, selectedBlockId])

  const [selectedLevel, setSelectedLevel] = useState<number>(() => currentModule?.level ?? 1)

  useEffect(() => {
    if (currentModule?.level && currentModule.level !== selectedLevel) {
      setSelectedLevel(currentModule.level)
    }
  }, [currentModule?.level, selectedLevel])

  const initialModuleId = useMemo(() => {
    const currentBlockId =
      flatBlocks.find((b) => b.progress?.status !== 'COMPLETED')?.id ?? flatBlocks[0]?.id
    const found = modules.find((m) => m.blocks.some((b) => b.id === currentBlockId))
    return found ? String(found.id) : String(modules[0]?.id)
  }, [modules, flatBlocks])

  const [openModuleIds, setOpenModuleIds] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {}
    modules.forEach((m) => {
      state[String(m.id)] = String(m.id) === initialModuleId
    })
    return state
  })

  function toggleModule(moduleId: string) {
    setOpenModuleIds((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  function selectBlock(blockId: string | undefined) {
    if (!blockId) return
    setSelectedBlockId(blockId)
    setView('lessons')
    const parent = modules.find((m) => m.blocks.some((b) => b.id === blockId))
    if (parent) {
      if (parent.level && parent.level !== selectedLevel) {
        setSelectedLevel(parent.level)
      }
      setOpenModuleIds((prev) => ({ ...prev, [String(parent.id)]: true }))
    }
  }

  const level1Modules = useMemo(() => modules.filter((m) => (m.level ?? 1) === 1), [modules])
  const level2Modules = useMemo(() => modules.filter((m) => m.level === 2), [modules])

  const level1Blocks = useMemo(() => level1Modules.flatMap((m) => m.blocks), [level1Modules])
  const level2Blocks = useMemo(() => level2Modules.flatMap((m) => m.blocks), [level2Modules])

  const level1Completed = level1Blocks.filter((b) => b.progress?.status === 'COMPLETED').length
  const level2Completed = level2Blocks.filter((b) => b.progress?.status === 'COMPLETED').length

  const displayedModules = useMemo(() => {
    return modules.filter((m) => (m.level ?? 1) === selectedLevel)
  }, [modules, selectedLevel])

  const levelInfo = pointsToNextLevel(gamification.points)

  function updateBlockProgress(blockId: string, progress: CourseBlock['progress']) {
    setModules((prev) =>
      prev.map((m) => ({
        ...m,
        blocks: m.blocks.map((b) => (b.id === blockId ? { ...b, progress } : b)),
      })),
    )
  }

  function applyGamification(
    next: GamificationSummary,
    pointsAwarded: number,
    unlockedAchievements: { key: string; title: string; points: number }[],
  ) {
    setGamification(next)

    if (unlockedAchievements.length > 0) {
      const unlockedKeys = new Set(unlockedAchievements.map((a) => a.key))
      setAchievements((prev) =>
        prev.map((achievement) =>
          unlockedKeys.has(achievement.key)
            ? { ...achievement, earnedAt: new Date().toISOString() }
            : achievement,
        ),
      )
    }

    const currentLevel = levelForPoints(gamification.points)
    const nextLevel = levelForPoints(next.points)
    const isLevelUp = nextLevel > currentLevel

    if (pointsAwarded > 0 || unlockedAchievements.length > 0 || isLevelUp) {
      setRewardToast({
        points: pointsAwarded,
        achievement: unlockedAchievements[0] ?? undefined,
        levelUp: isLevelUp ? nextLevel : undefined,
      })
      setLastAward({ points: pointsAwarded, achievementTitle: unlockedAchievements[0]?.title })
      window.setTimeout(() => setLastAward(null), 3000)
    }
  }

  function checkActionResult(
    result: ProgressActionResult,
  ): result is Extract<ProgressActionResult, { ok: true }> {
    if (!result.ok) {
      setErrorBanner(result.error ?? 'Ocurrió un problema al sincronizar el progreso.')
      return false
    }
    setErrorBanner(null)
    return true
  }

  function handleComplete(block: CourseBlock) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: block.type,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, { status: result.status, data: null })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleQuizSubmit(block: CourseBlock, optionId: string) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'QUIZ',
        selectedOptionId: optionId,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { selectedOptionId: optionId, correct: result.correct },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleScenarioSubmit(block: CourseBlock, choiceId: string) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'SCENARIO',
        selectedChoiceId: choiceId,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { selectedChoiceId: choiceId, isOptimal: result.isOptimal },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleClassificationSubmit(block: CourseBlock, classifications: Record<string, string>) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'CLASSIFICATION',
        classifications,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { classifications, correct: result.correct },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleSurveySubmit(block: CourseBlock, selectedIds: string[]) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'SURVEY',
        selectedIds,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { selectedIds },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleProjectStepSubmit(block: CourseBlock, stepData: Record<string, unknown>) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'PROJECT_STEP',
        stepData,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { stepData },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleAiPromptLabSubmit(block: CourseBlock, reflections: Record<string, string>) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'AI_PROMPT_LAB',
        reflections,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { reflections },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleMinigameSubmit(block: CourseBlock, gameData: Record<string, unknown>) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'MINIGAME',
        gameData,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: { answers: gameData },
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  function handleExamSubmit(
    block: CourseBlock,
    examResult: { score: number; passed: boolean; answers: Record<number, string> },
  ) {
    startTransition(async () => {
      const result = await recordBlockProgressAction({
        courseSlug,
        blockId: block.id,
        blockType: 'EXAM',
        examResult,
      })
      if (!checkActionResult(result)) return
      updateBlockProgress(block.id, {
        status: result.status,
        data: examResult,
      })
      applyGamification(result.gamification, result.pointsAwarded, result.unlockedAchievements)
    })
  }

  if (!selectedBlock) {
    return (
      <div className="flex min-h-screen items-center justify-center p-8 text-center text-muted-foreground">
        Este curso todavía no tiene contenido publicado.
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="Volver al inicio">
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <Image
              src="/images/logo/logo-unicaragena.svg"
              alt="Universidad de Cartagena"
              width={140}
              height={62}
              priority
              className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {courseDescription}
              </p>
              <h1 className="text-xl font-bold tracking-tight">{courseTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setBitacoraOpen(true)}
              className="flex items-center gap-2 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300 font-semibold"
            >
              <BookMarked className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Bitácora</span>
            </Button>

            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="relative flex items-center gap-3 rounded-full border bg-muted/40 px-4 py-2 transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Trophy className="h-4 w-4 text-amber-500" />
                {gamification.points} pts
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Star className="h-4 w-4 text-violet-500" />
                Nivel {levelForPoints(gamification.points)}
              </div>
              <div className="flex items-center gap-1.5 text-sm font-semibold">
                <Flame className="h-4 w-4 text-orange-500" />
                {gamification.streak}
              </div>

              {lastAward != null && (
                <span className="absolute -top-3 right-0 animate-bounce whitespace-nowrap rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">
                  +{lastAward.points} {lastAward.achievementTitle ? `· ${lastAward.achievementTitle}` : ''}
                </span>
              )}
            </button>

            <form action={logoutAction}>
              <Button type="submit" variant="outline">
                Cerrar sesión
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-4 max-w-xl">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Progreso del curso</span>
            <span>
              {completedCount}/{totalBlocks} lecciones · {overallProgress}%
            </span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {Math.round(levelInfo.current)}/{levelInfo.next} pts para el siguiente nivel
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 shrink-0 overflow-y-auto border-r p-4">
          <div className="mb-4 flex rounded-lg border p-1">
            <button
              type="button"
              onClick={() => setView('lessons')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors',
                view === 'lessons' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              <ListChecks className="h-3.5 w-3.5" />
              Lecciones
            </button>
            <button
              type="button"
              onClick={() => setView('flashcards')}
              className={cn(
                'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors',
                view === 'flashcards' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
              )}
            >
              <RotateCw className="h-3.5 w-3.5" />
              Tarjetas ({flashcards.length})
            </button>
          </div>

          {/* LEVEL SELECTOR TABS */}
          <div className="mb-3 grid grid-cols-2 gap-1 rounded-xl border bg-muted/40 p-1">
            <button
              type="button"
              onClick={() => {
                setSelectedLevel(1)
                const firstL1Block =
                  level1Blocks.find((b) => b.progress?.status !== 'COMPLETED') ?? level1Blocks[0]
                if (firstL1Block && currentModule?.level !== 1) {
                  selectBlock(firstL1Block.id)
                }
              }}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg py-2 px-2 text-center transition-all',
                selectedLevel === 1
                  ? 'bg-background text-foreground shadow-xs border font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium',
              )}
            >
              <span className="text-[10px] uppercase font-bold text-primary">Nivel 1</span>
              <span className="text-xs font-semibold truncate max-w-full">Comprensión</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                {level1Completed}/{level1Blocks.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedLevel(2)
                const firstL2Block =
                  level2Blocks.find((b) => b.progress?.status !== 'COMPLETED') ?? level2Blocks[0]
                if (firstL2Block && currentModule?.level !== 2) {
                  selectBlock(firstL2Block.id)
                }
              }}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg py-2 px-2 text-center transition-all',
                selectedLevel === 2
                  ? 'bg-background text-foreground shadow-xs border font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium',
              )}
            >
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                Nivel 2
              </span>
              <span className="text-xs font-semibold truncate max-w-full">Formulación</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">
                {level2Completed}/{level2Blocks.length}
              </span>
            </button>
          </div>

          <div className="mb-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
                Nivel {selectedLevel} de 3
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground">
                {selectedLevel === 1
                  ? `${level1Modules.length} Módulos`
                  : `${level2Modules.length} Módulos`}
              </span>
            </div>
            <p className="mt-1 text-xs font-bold text-foreground">
              {selectedLevel === 1
                ? 'Comprensión del Proyecto Tecnológico'
                : 'Formulación y Planeación (Alcance, Cronograma, Costos)'}
            </p>
          </div>

          {displayedModules.map((courseModule) => {
            const moduleId = String(courseModule.id)
            const isOpen = openModuleIds[moduleId] ?? false
            const moduleTotal = courseModule.blocks.length
            const moduleCompleted = courseModule.blocks.filter(
              (b) => b.progress?.status === 'COMPLETED',
            ).length
            const modulePercent =
              moduleTotal > 0 ? Math.round((moduleCompleted / moduleTotal) * 100) : 0
            const isModuleDone = moduleTotal > 0 && moduleCompleted === moduleTotal
            const hasActiveBlock = courseModule.blocks.some((b) => b.id === selectedBlock?.id)

            return (
              <div
                key={moduleId}
                className={cn(
                  'mb-3 overflow-hidden rounded-xl border bg-card/40 transition-all duration-200',
                  hasActiveBlock && 'border-primary/40 bg-muted/20',
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleModule(moduleId)}
                  className="flex w-full flex-col gap-1.5 p-3 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Módulo {courseModule.order}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {isModuleDone ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" />
                          100%
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-muted-foreground">
                          {moduleCompleted}/{moduleTotal}
                        </span>
                      )}
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform duration-200',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-sm font-semibold leading-snug text-foreground/90">
                    {courseModule.title}
                  </p>

                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-300',
                        isModuleDone ? 'bg-emerald-500' : 'bg-primary',
                      )}
                      style={{ width: `${modulePercent}%` }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="space-y-1 p-2 pt-0">
                    {courseModule.blocks.map((block) => {
                      const Icon = BLOCK_ICONS[block.type]
                      const isSelected = block.id === selectedBlock.id
                      const isCompleted = block.progress?.status === 'COMPLETED'

                      return (
                        <button
                          key={block.id}
                          type="button"
                          onClick={() => selectBlock(block.id)}
                          className={cn(
                            'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-all',
                            isSelected
                              ? 'bg-primary font-medium text-primary-foreground shadow-sm'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                          )}
                        >
                          {isCompleted ? (
                            <CheckCircle2
                              className={cn(
                                'h-4 w-4 shrink-0',
                                isSelected
                                  ? 'text-primary-foreground'
                                  : 'text-emerald-600 dark:text-emerald-400',
                              )}
                            />
                          ) : (
                            <Icon className="h-4 w-4 shrink-0" />
                          )}
                          <span className="truncate">{blockLabel(block)}</span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </aside>

        <main className="flex-1 overflow-y-auto p-8">
          {view === 'flashcards' ? (
            <FlashcardDeck cards={flashcards} />
          ) : (
            <div className="mx-auto max-w-2xl">
              {errorBanner && (
                <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorBanner}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
                    className="shrink-0 border-destructive/40 hover:bg-destructive/20"
                  >
                    Recargar
                  </Button>
                </div>
              )}
              <BlockRenderer
                key={selectedBlock.id}
                block={selectedBlock}
                pending={isPending}
                onComplete={() => handleComplete(selectedBlock)}
                onSubmitQuiz={(optionId) => handleQuizSubmit(selectedBlock, optionId)}
                onSubmitScenario={(choiceId) => handleScenarioSubmit(selectedBlock, choiceId)}
                onSubmitClassification={(cls) => handleClassificationSubmit(selectedBlock, cls)}
                onSubmitSurvey={(ids) => handleSurveySubmit(selectedBlock, ids)}
                onSubmitProjectStep={(stepData) => handleProjectStepSubmit(selectedBlock, stepData)}
                onSubmitAiPromptLab={(reflections) => handleAiPromptLabSubmit(selectedBlock, reflections)}
                onSubmitMinigame={(gameData) => handleMinigameSubmit(selectedBlock, gameData)}
                onSubmitExam={(examResult) => handleExamSubmit(selectedBlock, examResult)}
                onOpenBitacora={() => setBitacoraOpen(true)}
              />

              <div className="mt-8 flex items-center justify-between border-t pt-6">
                <Button
                  variant="outline"
                  onClick={() => selectBlock(flatBlocks[currentIndex - 1]?.id)}
                  disabled={currentIndex <= 0}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  onClick={() => selectBlock(flatBlocks[currentIndex + 1]?.id)}
                  disabled={currentIndex >= flatBlocks.length - 1}
                >
                  Siguiente
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {panelOpen && (
        <GamificationPanel
          gamification={gamification}
          achievements={achievements}
          onClose={() => setPanelOpen(false)}
        />
      )}

      <BitacoraModal
        open={bitacoraOpen}
        onClose={() => setBitacoraOpen(false)}
        courseTitle={courseTitle}
        modules={modules}
        blocks={flatBlocks}
        defaultLevel={selectedLevel}
      />

      <RewardToast
        reward={rewardToast}
        onClose={() => setRewardToast(null)}
        onOpenAchievements={() => {
          setRewardToast(null)
          setPanelOpen(true)
        }}
      />
    </div>
  )
}
