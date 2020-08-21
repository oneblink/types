// @flow
'use strict'

declare type DraftSubmission = {
  submission: {
    +[key: string]: mixed,
  },
  definition: Form,
  formsAppId: number,
  draftId: string | null,
  jobId: string | null,
  externalId: string | null,
  preFillFormDataId: string | null,
  keyId?: string,
}

declare type FormSubmission = DraftSubmission & {
  captchaTokens: string[],
}

declare type FormSubmissionResult = FormSubmission & {
  submissionId: string | null,
  submissionTimestamp: string | null,
  payment: {
    hostedFormUrl: string,
    submissionEvent: PaymentSubmissionEvent,
  } | null,
  isInPendingQueue: boolean,
  isOffline: boolean,
}

declare type PendingFormSubmissionResult = FormSubmission & {
  pendingTimestamp: string,
  isSubmitting?: boolean,
  error?: string,
}

declare type NewFormsAppDraft = {
  title: string,
  formId: number,
  externalId: ?string,
  jobId: ?string,
}

declare type FormsAppDraft = NewFormsAppDraft & {
  draftId: string,
  draftDataId?: string,
  updatedAt: string,
}

declare type FormsAppDrafts = {
  drafts: FormsAppDraft[],
  createdAt?: string,
  updatedAt?: string,
}

declare type FormsAppJob = {
  id: string,
  formId: number,
  draft?: FormsAppDraft,
  externalId?: string,
  preFillFormDataId?: string,
  createdAt: string,
  details: {
    title: string,
    key: ?string,
    priority: ?string,
    description: ?string,
    type: ?string,
  },
}

declare type S3UploadCredentials = {
  submissionId: string,
  submissionTimestamp: string,
  credentials: {
    AccessKeyId: string,
    SecretAccessKey: string,
    SessionToken: string,
  },
  s3: {
    region: string,
    bucket: string,
    key: string,
  },
}
