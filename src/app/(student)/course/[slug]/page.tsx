import { notFound } from 'next/navigation'
import config from '@payload-config'
import { getPayload } from 'payload'

import { auth } from '@/auth'
import { CoursePlayer } from '@/components/ova/course-player'
import type { AchievementSummary, CourseBlock, CourseModule } from '@/components/ova/types'
import { prisma } from '@/lib/prisma'
import type { BlockType } from '@/types/content-blocks'

type CourseDoc = { id: string | number; title: string; slug: string; description: string }
type ModuleDoc = {
  id: string | number
  title: string
  order: number
  level?: number
  levelTitle?: string
  course: string | number
}
type BlockDoc = {
  id: string | number
  type: BlockType
  order: number
  module: string | number
  blockData: unknown
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()
  if (!session?.user?.id) notFound()

  const payload = await getPayload({ config })

  const courseResult = await payload.find({
    collection: 'courses',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
  })
  const course = courseResult.docs[0] as CourseDoc | undefined
  if (!course) notFound()

  let enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseSlug: { userId: session.user.id, courseSlug: slug } },
  })

  if (!enrollment && session.user.role === 'TEACHER') {
    enrollment = await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseSlug: slug,
        status: 'ACTIVE',
      },
    })
  }

  if (!enrollment) notFound()

  const modulesResult = await payload.find({
    collection: 'modules',
    where: { course: { equals: course.id } },
    sort: 'order',
    depth: 0,
    limit: 100,
  })
  const modules = modulesResult.docs as ModuleDoc[]

  const blocksResult = await payload.find({
    collection: 'blocks',
    where: { module: { in: modules.map((m) => m.id) } },
    sort: 'order',
    depth: 0,
    limit: 500,
  })
  const blocks = blocksResult.docs as BlockDoc[]

  const [progressRows, gamification, achievements, earnedAchievements] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId: session.user.id, courseSlug: slug },
    }),
    prisma.gamificationState.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    }),
    prisma.achievement.findMany({ orderBy: { points: 'asc' } }),
    prisma.userAchievement.findMany({
      where: { userId: session.user.id },
      select: { achievementId: true, earnedAt: true },
    }),
  ])

  const progressByBlockId = new Map(progressRows.map((p) => [p.blockId, p]))
  const earnedByAchievementId = new Map(
    earnedAchievements.map((earned) => [earned.achievementId, earned.earnedAt]),
  )
  const achievementSummaries: AchievementSummary[] = achievements.map((achievement) => ({
    id: achievement.id,
    key: achievement.key,
    title: achievement.title,
    description: achievement.description,
    points: achievement.points,
    earnedAt: earnedByAchievementId.get(achievement.id)?.toISOString() ?? null,
  }))

  const courseModules: CourseModule[] = modules
    .sort((a, b) => a.order - b.order)
    .map((courseModule) => ({
      id: String(courseModule.id),
      title: courseModule.title,
      order: courseModule.order,
      level: courseModule.level ?? 1,
      levelTitle: courseModule.levelTitle ?? 'Nivel 1: Comprensión del proyecto tecnológico',
      blocks: blocks
        .filter((block) => String(block.module) === String(courseModule.id))
        .sort((a, b) => a.order - b.order)
        .map((block): CourseBlock => {
          const progress = progressByBlockId.get(String(block.id))
          return {
            id: String(block.id),
            type: block.type,
            order: block.order,
            blockData: block.blockData,
            progress: progress ? { status: progress.status, data: progress.data } : null,
          }
        }),
    }))

  return (
    <CoursePlayer
      courseSlug={course.slug}
      courseTitle={course.title}
      courseDescription={course.description}
      modules={courseModules}
      gamification={{
        points: gamification.points,
        level: gamification.level,
        streak: gamification.streak,
      }}
      achievements={achievementSummaries}
    />
  )
}
