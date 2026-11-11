import type { FormEventBase } from './common'

export type PowerAutomateFlowSubmissionEvent = FormEventBase & {
  type: 'POWER_AUTOMATE_FLOW'
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
