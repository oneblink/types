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
    previousFormSubmissionApprovalId?: number
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
  previousFormSubmissionApprovalId?: number
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

export interface NewFormsAppJob {
  username: string
  formId: number
  draft?: FormsAppDraft
  updatedAt: string
  externalId?: string
  preFillFormDataId?: string
  details: {
    title: string
    key?: string
    description?: string
    type?: string
    priority?: number
  }
}

export type FormsAppJob = NewFormsAppJob & {
  id: string
  isSubmitted: boolean
  createdAt: string
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
  usernameToken: string
}

export type S3UploadCredentials = _S3UploadCredentials & {
  submissionId: string
}

export type S3DraftUploadCredentials = _S3UploadCredentials & {
  draftDataId: string
}

type _FormSubmissionMeta = {
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
}

export type NewFormSubmissionMeta = _FormSubmissionMeta & {
  keyId?: string
}

export type FormSubmissionMeta = _FormSubmissionMeta & {
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
  crn2?: string
  crn3?: string
}

export type NewFormSubmissionFileAccessToken = {
  submissionId: string
  expiresAt: string
  s3: {
    region: string
    bucket: string
    key: string
  }
  emailAddress: string
}

export type FormSubmissionFileAccessToken = {
  id: string
  createdAt: string
} & NewFormSubmissionFileAccessToken

type BaseFormSubmissionApproval = {
  previousFormSubmissionApprovalId?: number
  submissionId: string
  formId: number
  username: string
  approvalsFormsAppId: number
  notificationEmailAddress?: string
}

export type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING'
}

export type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: number
  notes?: string
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED'
  createdAt: string
  updatedAt: string
}
