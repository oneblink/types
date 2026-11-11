import type { FormEventBase } from './common'

export type CPIntegrationHubWebhookSubmissionEvent = FormEventBase & {
  type: 'CP_INTEGRATION_HUB_WEBHOOK'
  configuration: {
    /** URL that the callback is made to. */
    url: string
    /**
     * The unique identifier for the form that should trigger this workflow
     * event
     */
    formId?: number
  }
}
