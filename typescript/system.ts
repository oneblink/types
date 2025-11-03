import { IdResource } from './misc'

export type FormsBuilderAISystemConfiguration = {
  systemPrompt: string
  maxTokensPerResponse: number
} & ({ topP: number } | { temperature: number }) &
  (
    | {
        shouldReason?: false
        topK: number
      }
    | {
        shouldReason: true
        reasoningTokenBudget: number
      }
  )

export interface NewAISystemConfiguration {
  name: string
  configuration: FormsBuilderAISystemConfiguration
  isEnabled: boolean
}

export interface AISystemConfiguration
  extends IdResource,
    NewAISystemConfiguration {
  lastUsedAt?: string
}
