import { IdResource } from './misc'

export interface FormsBuilderAISystemConfiguration extends IdResource {
  systemPrompt: string
  temperature: number
  topP: number
  topK: number
  maxTokensPerRequest: number
  lastUsedAt?: string
  isInUse: boolean
}
