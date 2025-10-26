import { IdResource } from './misc'

export interface FormsBuilderAISystemConfiguration {
  systemPrompt: string
  temperature: number
  topP: number
  topK: number
  maxTokensPerResponse: number
}

export interface NewAISystemConfiguration {
  configuration: FormsBuilderAISystemConfiguration
}

export interface AISystemConfiguration 
  extends IdResource, 
    NewAISystemConfiguration { 
  lastUsedAt?: string
  isEnabled: boolean
}
