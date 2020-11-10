import { Form } from './forms'
import { PaymentSubmissionEvent } from './submissionEvents'
import { NoU } from './misc'

export interface NewDraftSubmission {
  submission: {
    readonly [key: string]: unknown
  }
  definition: Form
}

export type NewFormSubmission = NewDraftSubmission & {
  captchaTokens: string[]
}

export type DraftSubmission = NewDraftSubmission & {
  formsAppId: number
  keyId?: string
}

export type FormSubmission = DraftSubmission &
  NewFormSubmission & {
    draftId: string | null
    jobId: string | null
    externalId: string | null
    preFillFormDataId: string | null
  }

export type FormSubmissionResult = FormSubmission & {
  submissionId: string | null
  submissionTimestamp: string | null
  payment: {
    hostedFormUrl: string
    submissionEvent: PaymentSubmissionEvent
  } | null
  isInPendingQueue: boolean
  isOffline: boolean
}

export type PendingFormSubmissionResult = FormSubmission & {
  pendingTimestamp: string
  isSubmitting?: boolean
  error?: string
}

export type PendingFormSubmissionResultWithOptionalSubmission = Pick<
  PendingFormSubmissionResult,
  Exclude<keyof PendingFormSubmissionResult, 'submission'>
> & {
  submission?: PendingFormSubmissionResult['submission']
}

export interface NewFormsAppDraft {
  title: string
  formId: number
  externalId: string | NoU
  jobId: string | NoU
}

export type FormsAppDraft = NewFormsAppDraft & {
  draftId: string
  draftDataId?: string
  updatedAt: string
}

export interface FormsAppDrafts {
  drafts: FormsAppDraft[]
  createdAt?: string
  updatedAt?: string
}

export interface FormsAppJob {
  id: string
  username: string
  formId: number
  draft?: FormsAppDraft
  updatedAt: string
  isSubmitted: boolean
  externalId?: string
  preFillFormDataId?: string
  createdAt: string
  details: {
    title: string
    key?: string
    description?: string
    type?: string
    priority?: number
  }
}

export interface JobSearchParameters {
  jobId?: string
  formIds?: number[]
  username?: string
  externalId?: string
  isSubmitted?: boolean
  limit?: number
  offset: number
}

interface _S3UploadCredentials {
  submissionTimestamp: string
  credentials: {
    AccessKeyId: string
    SecretAccessKey: string
    SessionToken: string
  }
  s3: {
    region: string
    bucket: string
    key: string
  }
}

export type S3UploadCredentials = _S3UploadCredentials & {
  submissionId: string
}

export type S3DraftUploadCredentials = _S3UploadCredentials & {
  draftDataId: string
}

export interface FormSubmissionMeta {
  submissionId: string
  formId: number
  formsAppId: number
  dateTimeSubmitted: string
  formName?: string
  user?: {
    userId: string
    firstName?: string
    picture?: string
    providerUserId?: string
    providerType?: string
    fullName?: string
    lastName?: string
    email?: string
    role?: string
    supervisor?: {
      email?: string
      fullName?: string
      providerUserId?: string
    }
  }
  key?: {
    id: string
    name: string
  }
}

export interface FormSubmissionRequest {
  submissionId: string
  recaptchas: Array<{
    token: string
  }>
}

export interface S3SubmissionData {
  submission: {
    [name: string]: any
  }
  definition: Form
  submissionTimestamp: string
  formsAppId: number
  keyId?: string
  user?: {
    userId: string
    firstName?: string
    picture?: string
    providerUserId?: string
    providerType?: string
    fullName?: string
    lastName?: string
    email?: string
  }
}

export interface GeneratePaymentConfigPayload {
  submissionId: string
  amount: number
  redirectUrl: string
}
