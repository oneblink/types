import type { EndpointConfigurationCallback } from '../misc'
import type { FormEventBase } from './common'

export type CallbackSubmissionEvent = FormEventBase &
  EndpointConfigurationCallback
