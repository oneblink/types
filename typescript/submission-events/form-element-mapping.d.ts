import type { PaymentDisplayDetailKey } from './payment-display-detail-key'

export type FormElementMapping<T> = T &
  (
    | {
        type: 'FORM_FORM_ELEMENT'
        formElementId: string
        mapping: FormElementMapping<T>
      }
    | {
        type: 'REPEATABLE_SET_FORM_ELEMENT'
        formElementId: string
        mapping: FormElementMapping<T>
        /**
         * The number of the entry in the repeatable set. Starts at 1 for the
         * first entry.
         */
        entryNumber: number
      }
    | {
        type: 'FORM_ELEMENT'
        formElementId: string
      }
    | {
        type: 'VALUE'
        value: number | string | boolean | string[]
      }
    | {
        type: 'SUBMISSION_ID'
      }
    | {
        type: 'EXTERNAL_ID'
      }
    | {
        type: 'SUBMISSION_TIMESTAMP'
      }
    | {
        type: 'COMPLETION_TIMESTAMP'
      }
    | {
        type: 'PAYMENT_DETAIL'
        key: PaymentDisplayDetailKey
      }
  )
