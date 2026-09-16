import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

type PromptChoice = string | { title?: string; value?: unknown }

type PromptQuestion = {
  name: string
  type: string
  choices?: PromptChoice[]
}

/** Auto-accept Payload/Drizzle prompts in Docker and CI (non-interactive). */
export function enableNonInteractiveMode() {
  process.env.CI = 'true'

  try {
    const prompts = require('prompts') as {
      override: (fn: (question: PromptQuestion) => Record<string, unknown>) => void
    }
    prompts.override((question) => {
      if (question.type === 'confirm') {
        return { [question.name]: true }
      }
      if (question.type === 'select') {
        const first = question.choices?.[0]
        const value =
          typeof first === 'object' && first !== null && 'value' in first
            ? first.value
            : first
        return { [question.name]: value ?? 0 }
      }
      if (question.type === 'multiselect') {
        return { [question.name]: [] }
      }
      return {}
    })
  } catch {
    // prompts is optional
  }
}
