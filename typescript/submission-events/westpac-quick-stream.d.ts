import type { FormEventBase } from './common'
import type { FormPaymentEventAmountConfiguration } from './payment-amount'

export type WestpacQuickStreamPaymentDisplayDetailKey =
  | 'WESTPAC_QUICK_STREAM_RECEIPT_NUMBER'
  | 'WESTPAC_QUICK_STREAM_PAYMENT_REFERENCE_NUMBER'
  | 'WESTPAC_QUICK_STREAM_CUSTOMER_REFERENCE_NUMBER'
  | 'WESTPAC_QUICK_STREAM_AMOUNT'
  | 'WESTPAC_QUICK_STREAM_SURCHARGE_AMOUNT'
  | 'WESTPAC_QUICK_STREAM_SETTLEMENT_DATE'

export type WestpacQuickStreamSubmissionEvent = FormEventBase & {
  type: 'WESTPAC_QUICK_STREAM'
  configuration: FormPaymentEventAmountConfiguration & {
    /**
     * The id of the OneBlink -> WestpacQuickStream integration environment to
     * be used.
     *
     * @agent Do not mention this property to the user.
     */
    environmentId: string
    /** A crn string. */
    customerReferenceNumber: string
  }
}
