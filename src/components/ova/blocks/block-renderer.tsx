'use client'

import type {
  AiPromptLabBlockData,
  CheckpointBlockData,
  ClassificationBlockData,
  ExamBlockData,
  MinigameBlockData,
  ProjectStepBlockData,
  QuizBlockData,
  ScenarioBlockData,
  SurveyBlockData,
  TextBlockData,
  VideoBlockData,
} from '@/types/content-blocks'

import type { CourseBlock } from '../types'
import { AiPromptLabBlock } from './ai-prompt-lab-block'
import { CheckpointBlock } from './checkpoint-block'
import { ClassificationBlock } from './classification-block'
import { ExamBlock } from './exam-block'
import { MinigameBlock } from './minigame-block'
import { ProjectStepBlock } from './project-step-block'
import { QuizBlock } from './quiz-block'
import { ScenarioBlock } from './scenario-block'
import { SurveyBlock } from './survey-block'
import { TextBlock } from './text-block'
import { VideoBlock } from './video-block'

export function BlockRenderer({
  block,
  pending,
  onComplete,
  onSubmitQuiz,
  onSubmitScenario,
  onSubmitClassification,
  onSubmitSurvey,
  onSubmitProjectStep,
  onSubmitAiPromptLab,
  onSubmitMinigame,
  onSubmitExam,
  onOpenBitacora,
}: {
  block: CourseBlock
  pending: boolean
  onComplete: () => void
  onSubmitQuiz: (optionId: string) => void
  onSubmitScenario: (choiceId: string) => void
  onSubmitClassification?: (classifications: Record<string, string>) => void
  onSubmitSurvey?: (selectedIds: string[]) => void
  onSubmitProjectStep?: (stepData: Record<string, unknown>) => void
  onSubmitAiPromptLab?: (reflections: Record<string, string>) => void
  onSubmitMinigame?: (gameData: Record<string, unknown>) => void
  onSubmitExam?: (result: { score: number; passed: boolean; answers: Record<number, string> }) => void
  onOpenBitacora?: () => void
}) {
  const completed = block.progress?.status === 'COMPLETED'

  switch (block.type) {
    case 'TEXT':
      return (
        <TextBlock
          data={block.blockData as TextBlockData}
          completed={completed}
          pending={pending}
          onComplete={onComplete}
        />
      )
    case 'VIDEO':
      return (
        <VideoBlock
          data={block.blockData as VideoBlockData}
          completed={completed}
          pending={pending}
          onComplete={onComplete}
        />
      )
    case 'CHECKPOINT':
      return (
        <CheckpointBlock
          data={block.blockData as CheckpointBlockData}
          completed={completed}
          pending={pending}
          onComplete={onComplete}
        />
      )
    case 'QUIZ':
      return (
        <QuizBlock
          data={block.blockData as QuizBlockData}
          progress={block.progress?.data as { selectedOptionId?: string; correct?: boolean } | null}
          completed={completed}
          pending={pending}
          onSubmit={onSubmitQuiz}
        />
      )
    case 'SCENARIO':
      return (
        <ScenarioBlock
          data={block.blockData as ScenarioBlockData}
          progress={block.progress?.data as { selectedChoiceId?: string; isOptimal?: boolean } | null}
          pending={pending}
          onSubmit={onSubmitScenario}
        />
      )
    case 'CLASSIFICATION':
      return (
        <ClassificationBlock
          data={block.blockData as ClassificationBlockData}
          progress={block.progress?.data as { classifications?: Record<string, string>; correct?: boolean } | null}
          completed={completed}
          pending={pending}
          onSubmit={(cls) => onSubmitClassification?.(cls)}
        />
      )
    case 'SURVEY':
      return (
        <SurveyBlock
          data={block.blockData as SurveyBlockData}
          progress={block.progress?.data as { selectedIds?: string[] } | null}
          completed={completed}
          pending={pending}
          onSubmit={(ids) => onSubmitSurvey?.(ids)}
        />
      )
    case 'PROJECT_STEP':
      return (
        <ProjectStepBlock
          data={block.blockData as ProjectStepBlockData}
          progress={block.progress?.data as { stepData?: Record<string, unknown> } | null}
          completed={completed}
          pending={pending}
          onSubmit={(data) => onSubmitProjectStep?.(data)}
          onOpenBitacora={onOpenBitacora}
        />
      )
    case 'AI_PROMPT_LAB':
      return (
        <AiPromptLabBlock
          data={block.blockData as AiPromptLabBlockData}
          progress={block.progress?.data as { reflections?: Record<string, string> } | null}
          completed={completed}
          pending={pending}
          onSubmit={(refs) => onSubmitAiPromptLab?.(refs)}
        />
      )
    case 'MINIGAME':
      return (
        <MinigameBlock
          data={block.blockData as MinigameBlockData}
          progress={block.progress?.data as { score?: number; answers?: Record<string, unknown> } | null}
          completed={completed}
          pending={pending}
          onSubmit={(data) => onSubmitMinigame?.(data)}
        />
      )
    case 'EXAM':
      return (
        <ExamBlock
          data={block.blockData as ExamBlockData}
          progress={
            block.progress?.data as {
              score?: number
              passed?: boolean
              answers?: Record<number, string>
            } | null
          }
          completed={completed}
          pending={pending}
          onSubmit={(res) => onSubmitExam?.(res)}
        />
      )
    default:
      return null
  }
}
