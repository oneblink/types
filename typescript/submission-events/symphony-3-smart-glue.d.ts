import type { FormEventBase } from './common'

export type Symphony3SmartGlueSubmissionEvent = FormEventBase & {
  type: 'SYMPHONY_3_SMART_GLUE'
  configuration: {
    /** URL that the callback is made to. */
    url: string
    /**
     * The unique identifier for the key that should be used for this workflow
     * event
     *
     * @agent Do not mention this property to the user.
     */
    keyId: string
  }
}
