import { IdResource } from './misc'

export type ClaudeBedrockAISystemConfiguration = {
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

export type AISystemConfigurationTypeFormsBuilder = 'FORMS_BUILDER'
export type AISystemConfigurationTypeEnvironmentStylist = 'ENVIRONMENT_STYLIST'

export type AISystemConfigurationType =
  | AISystemConfigurationTypeFormsBuilder
  | AISystemConfigurationTypeEnvironmentStylist

export interface NewAISystemConfiguration {
  name: string
  type: AISystemConfigurationType
  configuration: ClaudeBedrockAISystemConfiguration & {
    shouldParseIncompleteResource?: boolean
  }
  isEnabled: boolean
}

export interface AISystemConfiguration
  extends IdResource,
    NewAISystemConfiguration {
  lastUsedAt?: string
}
