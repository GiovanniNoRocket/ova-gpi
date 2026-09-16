'use server'

import { revalidatePath } from 'next/cache'
import config from '@payload-config'
import { getPayload } from 'payload'
import { Prisma } from '@prisma/client'

import { auth } from '@/auth'
import {
  POINTS_CHECKPOINT,
  POINTS_QUIZ_CORRECT,
  POINTS_SCENARIO_OPTIMAL,
  POINTS_SCENARIO_OTHER,
  POINTS_TEXT,
  POINTS_VIDEO,
  levelForPoints,
} from '@/lib/gamification'
import { prisma } from '@/lib/prisma'
import type { BlockType } from '@/types/content-blocks'

type ProgressActionInput = {
  courseSlug: string
  blockId: string
  blockType: BlockType
  selectedOptionId?: string
  selectedChoiceId?: string
  classifications?: Record<string, string>
  selectedIds?: string[]
  stepData?: Record<string, unknown>
  reflections?: Record<string, string>
  gameData?: Record<string, unknown>
  examResult?: { score: number; passed: boolean; answers: Record<number, string> }
}

type UnlockedAchievement = { key: string; title: string; points: number }

export type ProgressActionResult =
  | {
      ok: true
      status: 'COMPLETED' | 'IN_PROGRESS'
      correct?: boolean
      isOptimal?: boolean
      pointsAwarded: number
      gamification: { points: number; level: number; streak: number }
      unlockedAchievements: UnlockedAchievement[]
    }
  | { ok: false; error: string }

async function awardAchievement(userId: string, key: string): Promise<UnlockedAchievement | null> {
  const achievement = await prisma.achievement.findUnique({ where: { key } })
  if (!achievement) return null

  const existing = await prisma.userAchievement.findUnique({
    where: { userId_achievementId: { userId, achievementId: achievement.id } },
  })
  if (existing) return null

  await prisma.userAchievement.create({ data: { userId, achievementId: achievement.id } })
  if (achievement.points > 0) {
    await prisma.gamificationState.update({
      where: { userId },
      data: { points: { increment: achievement.points } },
    })
  }

  return { key: achievement.key, title: achievement.title, points: achievement.points }
}

const MODULE_ACHIEVEMENTS: Record<number, string> = {
  1: 'explorador-ova',
  2: 'arquitecto-proyecto',
  3: 'arquitecto-tic',
  4: 'estratega-proyecto',
  5: 'supervisor-ia',
  6: 'formulador-proyectos',
  7: 'arquitecto-alcance',
  8: 'planificador-costos',
}

async function checkAndAwardAchievements(
  userId: string,
  courseSlug: string,
  moduleId: string | number,
): Promise<UnlockedAchievement[]> {
  const payload = await getPayload({ config })
  const unlocked: UnlockedAchievement[] = []

  const currentMod = await payload.findByID({ collection: 'modules', id: moduleId, depth: 0 })

  const moduleBlocks = await payload.find({
    collection: 'blocks',
    where: { module: { equals: moduleId } },
    depth: 0,
    limit: 500,
  })
  const moduleBlockIds = moduleBlocks.docs.map((block) => String(block.id))
  const completedInModule = await prisma.userProgress.count({
    where: { userId, blockId: { in: moduleBlockIds }, status: 'COMPLETED' },
  })
  if (moduleBlockIds.length > 0 && completedInModule === moduleBlockIds.length) {
    const defaultAward = await awardAchievement(userId, 'first-module')
    if (defaultAward) unlocked.push(defaultAward)

    const moduleOrder = typeof currentMod?.order === 'number' ? currentMod.order : 1
    const specificBadge = MODULE_ACHIEVEMENTS[moduleOrder]
    if (specificBadge) {
      const awarded = await awardAchievement(userId, specificBadge)
      if (awarded) unlocked.push(awarded)
    }
  }

  const courseResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: courseSlug } },
    depth: 0,
    limit: 1,
  })
  const course = courseResult.docs[0]
  if (course) {
    const courseModules = await payload.find({
      collection: 'modules',
      where: { course: { equals: course.id } },
      depth: 0,
      limit: 100,
    })
    const moduleIds = courseModules.docs.map((courseModule) => courseModule.id)
    const courseBlocks = await payload.find({
      collection: 'blocks',
      where: { module: { in: moduleIds } },
      depth: 0,
      limit: 1000,
    })
    const courseBlockIds = courseBlocks.docs.map((block) => String(block.id))
    const completedInCourse = await prisma.userProgress.count({
      where: { userId, blockId: { in: courseBlockIds }, status: 'COMPLETED' },
    })
    if (courseBlockIds.length > 0 && completedInCourse === courseBlockIds.length) {
      const awarded = await awardAchievement(userId, 'course-complete')
      if (awarded) unlocked.push(awarded)
    }
  }

  return unlocked
}

export async function recordBlockProgressAction(
  input: ProgressActionInput,
): Promise<ProgressActionResult> {
  const session = await auth()
  if (!session?.user?.id || (session.user.role !== 'STUDENT' && session.user.role !== 'TEACHER')) {
    return { ok: false, error: 'No autorizado' }
  }
  const userId = session.user.id

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseSlug: { userId, courseSlug: input.courseSlug } },
  })
  if (!enrollment) {
    return { ok: false, error: 'No estás inscrito en este curso' }
  }

  const payload = await getPayload({ config })
  let block: { id: string | number; blockData?: unknown; module?: unknown } | null = null
  try {
    block = (await payload.findByID({ collection: 'blocks', id: input.blockId, depth: 0 })) as unknown as {
      id: string | number
      blockData?: unknown
      module?: unknown
    }
  } catch {
    return {
      ok: false,
      error: 'El contenido del curso fue actualizado en el servidor. Por favor recarga la página (F5) para continuar.',
    }
  }

  if (!block) {
    return {
      ok: false,
      error: 'El bloque no fue encontrado. Por favor recarga la página (F5).',
    }
  }

  const blockData = block.blockData as Record<string, unknown> | null

  const existing = await prisma.userProgress.findUnique({
    where: { userId_blockId: { userId, blockId: input.blockId } },
  })

  let correct: boolean | undefined
  let isOptimal: boolean | undefined
  let willComplete = true
  let points = typeof blockData?.pointsAwarded === 'number' ? blockData.pointsAwarded : 0
  let data: Prisma.InputJsonValue | undefined

  switch (input.blockType) {
    case 'QUIZ': {
      const options =
        (blockData as { options?: { id: string; isCorrect: boolean }[] } | null)?.options ?? []
      correct = options.find((option) => option.id === input.selectedOptionId)?.isCorrect ?? false
      willComplete = correct
      if (points === 0) points = POINTS_QUIZ_CORRECT
      data = { selectedOptionId: input.selectedOptionId, correct }
      break
    }
    case 'SCENARIO': {
      const choices =
        (blockData as { choices?: { id: string; isOptimal?: boolean }[] } | null)?.choices ?? []
      isOptimal = choices.find((choice) => choice.id === input.selectedChoiceId)?.isOptimal ?? false
      if (points === 0) points = isOptimal ? POINTS_SCENARIO_OPTIMAL : POINTS_SCENARIO_OTHER
      data = { selectedChoiceId: input.selectedChoiceId, isOptimal }
      break
    }
    case 'VIDEO':
      if (points === 0) points = POINTS_VIDEO
      break
    case 'CHECKPOINT':
      if (points === 0) points = POINTS_CHECKPOINT
      break
    case 'CLASSIFICATION': {
      const items = (blockData as { items?: { id: string; category: string }[] } | null)?.items ?? []
      const classifications = input.classifications ?? {}
      const allCorrect = items.length > 0 && items.every((it) => classifications[it.id] === it.category)
      correct = allCorrect
      willComplete = allCorrect
      if (points === 0) points = 30
      data = { classifications: classifications as unknown as Prisma.InputJsonValue, correct: allCorrect }
      break
    }
    case 'SURVEY': {
      willComplete = true
      if (points === 0) points = 20
      data = { selectedIds: input.selectedIds ?? [] }
      break
    }
    case 'PROJECT_STEP': {
      willComplete = true
      if (points === 0) points = 50
      data = { stepData: (input.stepData ?? {}) as unknown as Prisma.InputJsonValue }
      break
    }
    case 'AI_PROMPT_LAB': {
      willComplete = true
      if (points === 0) points = 40
      data = { reflections: (input.reflections ?? {}) as unknown as Prisma.InputJsonValue }
      break
    }
    case 'MINIGAME': {
      willComplete = true
      if (points === 0) points = 100
      data = { answers: (input.gameData ?? {}) as unknown as Prisma.InputJsonValue }
      break
    }
    case 'EXAM': {
      const passed = input.examResult?.passed ?? false
      willComplete = passed
      if (points === 0) points = passed ? 500 : 0
      data = (input.examResult as unknown as Prisma.InputJsonValue) ?? {}
      break
    }
    default:
      if (points === 0) points = POINTS_TEXT
  }

  const newStatus = willComplete ? 'COMPLETED' : 'IN_PROGRESS'
  const alreadyCompleted = existing?.status === 'COMPLETED'

  await prisma.userProgress.upsert({
    where: { userId_blockId: { userId, blockId: input.blockId } },
    update: {
      status: newStatus,
      data,
      completedAt: willComplete ? new Date() : (existing?.completedAt ?? null),
    },
    create: {
      userId,
      courseSlug: input.courseSlug,
      blockId: input.blockId,
      status: newStatus,
      data,
      completedAt: willComplete ? new Date() : null,
    },
  })

  let pointsAwarded = 0
  const unlockedAchievements: UnlockedAchievement[] = []
  let gamification = await prisma.gamificationState.upsert({
    where: { userId },
    update: {},
    create: { userId },
  })

  if (willComplete && !alreadyCompleted) {
    pointsAwarded = points
    gamification = await prisma.gamificationState.update({
      where: { userId },
      data: { points: { increment: points } },
    })

    // Check if block specifically awards a badge
    const badgeKey = typeof blockData?.badgeKey === 'string' ? blockData.badgeKey : null
    if (badgeKey) {
      const directAward = await awardAchievement(userId, badgeKey)
      if (directAward) unlockedAchievements.push(directAward)
    }

    const moduleId =
      typeof block.module === 'object' && block.module !== null
        ? (block.module as { id: string | number }).id
        : (block.module as string | number)

    const moduleAchievements = await checkAndAwardAchievements(
      userId,
      input.courseSlug,
      moduleId,
    )
    unlockedAchievements.push(...moduleAchievements)

    gamification = await prisma.gamificationState.findUniqueOrThrow({ where: { userId } })

    const newLevel = levelForPoints(gamification.points)
    if (newLevel !== gamification.level) {
      gamification = await prisma.gamificationState.update({
        where: { userId },
        data: { level: newLevel },
      })
    }
  }

  revalidatePath(`/course/${input.courseSlug}`)

  return {
    ok: true,
    status: newStatus,
    correct,
    isOptimal,
    pointsAwarded,
    unlockedAchievements,
    gamification: {
      points: gamification.points,
      level: gamification.level,
      streak: gamification.streak,
    },
  }
}
