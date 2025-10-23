import { IdResource } from './misc'

export interface FormsBuilderAISystemConfiguration extends IdResource {
  systemPrompt: string
  temperature: number
  topP: number
  topK: number
  maxTokensPerResponse: number
  lastUsedAt?: string
  isInUse: boolean
}
