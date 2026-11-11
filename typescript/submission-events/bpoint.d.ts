import type { FormEventBase } from './common'
import type { FormPaymentEventAmountConfiguration } from './payment-amount'

export type BPointPaymentDisplayDetailKey =
  | 'BPOINT_RECEIPT_NUMBER'
  | 'BPOINT_CRN1'
  | 'BPOINT_CRN2'
  | 'BPOINT_CRN3'
  | 'BPOINT_BILLER_CODE'
  | 'BPOINT_CREDIT_CARD_MASK'
  | 'BPOINT_AMOUNT'
  | 'BPOINT_SURCHARGE_AMOUNT'
  | 'BPOINT_PROCESSED_DATE_TIME'

export type BPOINTSubmissionEvent = FormEventBase & {
  type: 'BPOINT'
  configuration: FormPaymentEventAmountConfiguration & {
    /**
     * The id of the OneBlink -> BPOINT integration environment to be used.
     *
     * @agent Do not mention this property to the user.
     */
    environmentId: string
    /** An optional crn string. */
    crn2?: string
    /** An optional crn string. */
    crn3?: string
  }
}
