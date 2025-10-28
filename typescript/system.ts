import { IdResource } from './misc'

export type FormsBuilderAISystemConfiguration = {
  systemPrompt: string
  topP: number
  maxTokensPerResponse: number
} & (
  | {
      shouldReason?: false
      topK: number
      temperature: number
    }
  | {
      shouldReason: true
      reasoningTokenBudget?: number
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
