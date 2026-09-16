import type { ProgressStatus } from '@prisma/client'

import type { BlockType } from '@/types/content-blocks'

export type CourseBlock = {
  id: string
  type: BlockType
  order: number
  blockData: unknown
  progress: { status: ProgressStatus; data: unknown } | null
}

export type CourseModule = {
  id: string
  title: string
  order: number
  level?: number
  levelTitle?: string
  blocks: CourseBlock[]
}

export type GamificationSummary = { points: number; level: number; streak: number }

export type AchievementSummary = {
  id: string
  key: string
  title: string
  description: string
  points: number
  earnedAt: string | null
}
