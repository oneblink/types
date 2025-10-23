export interface System {
  formsBuilderAI: {
    systemPrompt: string
    previousSystemPrompts: Array<{
      systemPrompt: string
      archivedAt: string
    }>
    temperature: number
    topP: number
    topK: number
    maxTokensPerRequest: number
  }
}
