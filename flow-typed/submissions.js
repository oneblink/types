// @flow
'use strict'

declare type NewDraftSubmission = {
  submission: {
    +[key: string]: mixed,
  },
  definition: Form,
}

declare type NewFormSubmission = NewDraftSubmission & {
  captchaTokens: string[],
}

declare type DraftSubmission = NewDraftSubmission & {
  formsAppId: number,
  keyId?: string,
}

declare type FormSubmission = DraftSubmission &
  NewFormSubmission & {
    draftId: string | null,
    jobId: string | null,
    externalId: string | null,
    preFillFormDataId: string | null,
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
