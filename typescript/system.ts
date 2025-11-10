import { IdResource } from './misc'

export type FormsBuilderAISystemConfiguration = {
  shouldParseIncompleteForm?: boolean
  systemPrompt: string
  topPOrTemperature: 'TOP_P' | 'TEMPERATURE'
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
