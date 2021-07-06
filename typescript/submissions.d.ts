import { Form } from './forms'
import {
  PaymentSubmissionEvent,
  SchedulingSubmissionEvent,
} from './submissionEvents'
import { NoU, UserProfile } from './misc'
import { S3ObjectCredentials } from './aws'

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
    previousFormSubmissionApprovalId?: string
  }

export type FormSubmissionResult = FormSubmission & {
  submissionId: string | null
  submissionTimestamp: string | null
  payment: {
    hostedFormUrl: string
    submissionEvent: PaymentSubmissionEvent
  } | null
  scheduling: {
    bookingUrl: string
    submissionEvent: SchedulingSubmissionEvent
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
  previousFormSubmissionApprovalId?: string
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

type _S3UploadCredentials = S3ObjectCredentials & {
  submissionTimestamp: string
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
  user?: UserProfile
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
  user?: _FormSubmissionMeta['user']
}

export type NewFormSubmissionFileAccessToken = {
  submissionId: string
  expiresAt: string
  s3: S3ObjectCredentials['s3']
  emailAddress: string
}

export type FormSubmissionFileAccessToken = {
  id: string
  createdAt: string
} & NewFormSubmissionFileAccessToken

export type FormSubmissionAttachment = {
  s3: {
    bucket: string
    key: string
    region: string
  }
  url: string
  contentType: string
  fileName: string
  id: string
  isPrivate: boolean
}
