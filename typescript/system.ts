import { IdResource } from './misc'

export type ClaudeBedrockAISystemConfiguration = {
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
  type: 'FORMS_BUILDER' | 'ENVIRONMENT_APP_STYLES_BUILDER'
  configuration: ClaudeBedrockAISystemConfiguration
  isEnabled: boolean
}

export interface AISystemConfiguration
  extends IdResource,
    NewAISystemConfiguration {
  lastUsedAt?: string
}
