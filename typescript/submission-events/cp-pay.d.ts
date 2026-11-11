import type { FormEventBase } from './common'
import type { FormPaymentEventAmountConfiguration } from './payment-amount'

export type CPPayPaymentDisplayDetailKey =
  | 'CP_PAY_TRANSACTION_ID'
  | 'CP_PAY_ORDER_NUMBER'
  | 'CP_PAY_PAYMENT_TYPE'
  | 'CP_PAY_CREDIT_CARD_MASK'
  | 'CP_PAY_AMOUNT'
  | 'CP_PAY_CREATED_DATE_TIME'

export type CPPaySubmissionEvent = FormEventBase & {
  type: 'CP_PAY'
  configuration: FormPaymentEventAmountConfiguration & {
    /**
     * The id of the OneBlink -> CP Pay integration gateway to be used.
     *
     * @agent Do not mention this property to the user.
     */
    gatewayId: string
  }
}
