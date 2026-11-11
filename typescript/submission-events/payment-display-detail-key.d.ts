import type { BPointPaymentDisplayDetailKey } from './bpoint'
import type { CPPayPaymentDisplayDetailKey } from './cp-pay'
import type { NSWGovPayPaymentDisplayDetailKey } from './nsw-gov-pay'
import type { WestpacQuickStreamPaymentDisplayDetailKey } from './westpac-quick-stream'

export type PaymentDisplayDetailKey =
  | NSWGovPayPaymentDisplayDetailKey
  | BPointPaymentDisplayDetailKey
  | CPPayPaymentDisplayDetailKey
  | WestpacQuickStreamPaymentDisplayDetailKey
