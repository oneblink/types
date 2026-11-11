import type { FormEventBase } from './common'
import type { FormPaymentEventAmountConfiguration } from './payment-amount'

export type NSWGovPayPaymentDisplayDetailKey =
  | 'NSW_GOV_PAY_COMPLETION_REFERENCE'
  | 'NSW_GOV_PAY_PAYMENT_REFERENCE'
  | 'NSW_GOV_PAY_BANK_REFERENCE'
  | 'NSW_GOV_PAY_PAYMENT_METHOD'
  | 'NSW_GOV_PAY_BPAY_BILLER_CODE'
  | 'NSW_GOV_PAY_CREDIT_CARD_NUMBER'
  | 'NSW_GOV_PAY_AMOUNT'
  | 'NSW_GOV_PAY_SURCHARGE_AMOUNT'
  | 'NSW_GOV_PAY_SURCHARGE_GST'
  | 'NSW_GOV_PAY_CREATED_DATE_TIME'

export type NSWGovPaySubmissionEvent = FormEventBase & {
  type: 'NSW_GOV_PAY'
  configuration: FormPaymentEventAmountConfiguration & {
    /**
     * The id of the OneBlink -> NSW_GOV_PAY integration primary agency to be
     * used.
     *
     * @agent Do not mention this property to the user.
     */
    primaryAgencyId: string
    /**
     * Used to describe the product the customer is purchasing. Passed on NSW
     * GovPay during the request payment process
     */
    productDescription: string
    /**
     * An optional customer reference that will be passed on NSW GovPay during
     * the request payment process
     */
    customerReference?: string
    /**
     * A optional sub agency code that will ensure the payment goes to the
     * correct agency within NSW GovPay
     */
    subAgencyCode?: string
  }
}
