import { z } from 'zod'

export const blockTypeSchema = z.enum([
  'TEXT',
  'VIDEO',
  'QUIZ',
  'SCENARIO',
  'CHECKPOINT',
  'CLASSIFICATION',
  'SURVEY',
  'PROJECT_STEP',
  'AI_PROMPT_LAB',
  'MINIGAME',
  'EXAM',
])

export type BlockType = z.infer<typeof blockTypeSchema>

export const textBlockDataSchema = z.object({
  heading: z.string().optional(),
  content: z.string().min(1),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const videoBlockDataSchema = z.object({
  title: z.string().optional(),
  url: z.string().url(),
  durationSeconds: z.number().int().positive().optional(),
  transcript: z.string().optional(),
  followUpPrompt: z.string().optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const quizOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  isCorrect: z.boolean(),
})

export const quizBlockDataSchema = z.object({
  question: z.string().min(1),
  options: z.array(quizOptionSchema).min(2),
  explanation: z.string().optional(),
  passingScore: z.number().min(0).max(100).optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const scenarioChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  feedback: z.string().min(1),
  isOptimal: z.boolean().optional(),
})

export const scenarioBlockDataSchema = z.object({
  title: z.string().min(1),
  situation: z.string().min(1),
  choices: z.array(scenarioChoiceSchema).min(2),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const checkpointBlockDataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  criteria: z.array(z.string().min(1)).min(1),
  requiredBlockIds: z.array(z.string()).optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const classificationItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  category: z.string().min(1),
})

export const classificationBlockDataSchema = z.object({
  title: z.string().min(1),
  instruction: z.string().min(1),
  categories: z.array(z.string().min(1)).min(2),
  items: z.array(classificationItemSchema).min(2),
  explanation: z.string().optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const surveyOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
})

export const surveyBlockDataSchema = z.object({
  title: z.string().min(1),
  question: z.string().min(1),
  maxSelections: z.number().int().min(1).default(1),
  options: z.array(surveyOptionSchema).min(2),
  feedback: z.string().optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const projectStepFieldSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  placeholder: z.string().optional(),
  maxWords: z.number().int().positive().optional(),
  fieldType: z.enum(['text', 'textarea', 'select', 'checkbox_group']).default('textarea'),
  options: z.array(z.string()).optional(),
})

export const projectStepBlockDataSchema = z.object({
  stepNumber: z.number().int().nonnegative(),
  title: z.string().min(1),
  instruction: z.string().min(1),
  stepType: z.enum(['SELECT_PROJECT', 'TEXT_FIELDS', 'MATRIX', 'ROLES_TABLE']).default('TEXT_FIELDS'),
  projectOptions: z.array(z.string()).optional(),
  fields: z.array(projectStepFieldSchema).optional(),
  matrixColumns: z.array(z.string()).optional(),
  matrixRows: z.array(z.string()).optional(),
  advice: z.string().optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const aiPromptLabBlockDataSchema = z.object({
  title: z.string().min(1),
  role: z.string().optional(),
  prompt: z.string().min(1),
  toolUrl: z.string().optional(),
  guidance: z.string().optional(),
  reflectionQuestions: z.array(z.string()).min(1),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const minigameRoundSchema = z.object({
  roundNumber: z.number().int().positive(),
  context: z.string().min(1),
  aiResponse: z.string().min(1),
  correctAnswer: z.enum(['RESPALDADA', 'VERIFICAR', 'SIN_EVIDENCIA']),
  feedback: z.string().min(1),
  justificationOptions: z.array(
    z.object({
      id: z.string().min(1),
      text: z.string().min(1),
      isCorrect: z.boolean(),
    }),
  ).optional(),
  xpAwarded: z.number().int().nonnegative().optional(),
})

export const minigameReportTargetSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['INVENTED', 'CONTRADICTION', 'NO_EVIDENCE', 'CORRECT']),
  typeLabel: z.string().min(1),
  targetText: z.string().min(1),
  location: z.string().min(1),
  explanation: z.string().min(1),
})

export const minigameBlockDataSchema = z.object({
  gameType: z.enum(['CONFIDENCE_ROUNDS', 'ERROR_HUNTER', 'CARD_SORT']),
  title: z.string().min(1),
  description: z.string().min(1),
  rounds: z.array(minigameRoundSchema).optional(),
  reportAudit: z.object({
    reportTitle: z.string().min(1),
    reportDate: z.string().optional(),
    reportSections: z.array(z.object({ title: z.string().min(1), content: z.string().min(1) })),
    targets: z.array(minigameReportTargetSchema),
  }).optional(),
  cards: z.array(
    z.object({
      id: z.string().min(1),
      text: z.string().min(1),
      correctCategory: z.string().min(1),
    }),
  ).optional(),
  categories: z.array(z.string()).optional(),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export const examQuestionSchema = z.object({
  id: z.number().int().positive(),
  question: z.string().min(1),
  scenario: z.string().optional(),
  options: z.array(
    z.object({
      id: z.string().min(1),
      text: z.string().min(1),
    }),
  ).min(2),
  correctOptionId: z.string().min(1),
  explanation: z.string().optional(),
})

export const examBlockDataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  questionsCount: z.number().int().positive(),
  pointsPerQuestion: z.number().int().positive().default(4),
  passingScore: z.number().min(0).max(100).default(70),
  questions: z.array(examQuestionSchema).min(1),
  badgeKey: z.string().optional(),
  pointsAwarded: z.number().int().nonnegative().optional(),
})

export type TextBlockData = z.infer<typeof textBlockDataSchema>
export type VideoBlockData = z.infer<typeof videoBlockDataSchema>
export type QuizBlockData = z.infer<typeof quizBlockDataSchema>
export type ScenarioBlockData = z.infer<typeof scenarioBlockDataSchema>
export type CheckpointBlockData = z.infer<typeof checkpointBlockDataSchema>
export type ClassificationBlockData = z.infer<typeof classificationBlockDataSchema>
export type SurveyBlockData = z.infer<typeof surveyBlockDataSchema>
export type ProjectStepBlockData = z.infer<typeof projectStepBlockDataSchema>
export type AiPromptLabBlockData = z.infer<typeof aiPromptLabBlockDataSchema>
export type MinigameBlockData = z.infer<typeof minigameBlockDataSchema>
export type ExamBlockData = z.infer<typeof examBlockDataSchema>

export type BlockDataByType = {
  TEXT: TextBlockData
  VIDEO: VideoBlockData
  QUIZ: QuizBlockData
  SCENARIO: ScenarioBlockData
  CHECKPOINT: CheckpointBlockData
  CLASSIFICATION: ClassificationBlockData
  SURVEY: SurveyBlockData
  PROJECT_STEP: ProjectStepBlockData
  AI_PROMPT_LAB: AiPromptLabBlockData
  MINIGAME: MinigameBlockData
  EXAM: ExamBlockData
}

const blockDataSchemas: Record<BlockType, z.ZodTypeAny> = {
  TEXT: textBlockDataSchema,
  VIDEO: videoBlockDataSchema,
  QUIZ: quizBlockDataSchema,
  SCENARIO: scenarioBlockDataSchema,
  CHECKPOINT: checkpointBlockDataSchema,
  CLASSIFICATION: classificationBlockDataSchema,
  SURVEY: surveyBlockDataSchema,
  PROJECT_STEP: projectStepBlockDataSchema,
  AI_PROMPT_LAB: aiPromptLabBlockDataSchema,
  MINIGAME: minigameBlockDataSchema,
  EXAM: examBlockDataSchema,
}

export function parseBlockData<T extends BlockType>(
  type: T,
  data: unknown,
): BlockDataByType[T] {
  return blockDataSchemas[type].parse(data) as BlockDataByType[T]
}

