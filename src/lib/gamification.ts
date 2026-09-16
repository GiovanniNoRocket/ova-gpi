export const POINTS_TEXT = 10
export const POINTS_VIDEO = 10
export const POINTS_CHECKPOINT = 10
export const POINTS_QUIZ_CORRECT = 10
export const POINTS_SCENARIO_OPTIMAL = 15
export const POINTS_SCENARIO_OTHER = 10

export function levelForPoints(points: number): number {
  return Math.floor(points / 100) + 1
}

export function pointsToNextLevel(points: number): { current: number; next: number; progress: number } {
  const level = levelForPoints(points)
  const currentLevelFloor = (level - 1) * 100
  const nextLevelCeil = level * 100
  const progress = ((points - currentLevelFloor) / (nextLevelCeil - currentLevelFloor)) * 100
  return { current: points - currentLevelFloor, next: nextLevelCeil - currentLevelFloor, progress }
}
