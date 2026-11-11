import type { FormEventBase } from './common'

export type CivicRecCompleteCheckoutSubmissionEvent = FormEventBase & {
  type: 'CIVIC_REC_COMPLETE_CHECKOUT'
  configuration: {
    /** @agent Do not mention this property to the user. */
    environmentId: string
  }
}
