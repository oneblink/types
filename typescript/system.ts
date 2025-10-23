import { IdResource } from './misc'

export interface NewFormsBuilderAISystemConfiguration {
  systemPrompt: string
  temperature: number
  topP: number
  topK: number
  maxTokensPerResponse: number
}
export interface FormsBuilderAISystemConfiguration
  extends IdResource,
    NewFormsBuilderAISystemConfiguration {
  lastUsedAt?: string
  isInUse: boolean
}
