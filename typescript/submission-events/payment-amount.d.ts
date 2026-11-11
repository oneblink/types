/**
 * Determines the amount to be paid for a payment event. Exactly one of
 * `elementId`, `paymentAmount`, or `paymentCalculation` must be provided.
 */
export type FormPaymentEventAmountConfiguration =
  | {
      /** Amount is taken from a form element value. */
      amountType?: 'FORM_ELEMENT'
      /**
       * The elementId that holds the value that will be paid. Must be the id of
       * a number or calculation element.
       */
      elementId: string
    }
  | {
      /** Amount is a fixed number. */
      amountType: 'NUMBER'
      /** A fixed amount that will be paid. */
      paymentAmount: number
    }
  | {
      /** Amount is calculated from an expression. */
      amountType: 'EXPRESSION'
      /**
       * The calculation algorithm that must return a number. Supports the same
       * syntax as calculation form elements.
       */
      paymentCalculation: string
    }
