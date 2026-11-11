import type { EndpointConfigurationAPI } from '../misc'
import type { FormEventBase } from './common'

export type OneBlinkAPISubmissionEvent = FormEventBase &
  EndpointConfigurationAPI
