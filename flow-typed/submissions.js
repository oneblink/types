// @flow

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

declare type NewFormsAppJob = {
  username: string,
  formId: number,
  draft?: FormsAppDraft,
  updatedAt: string,
  externalId?: string,
  preFillFormDataId?: string,
  details: {
    title: string,
    key?: string,
    description?: string,
    type?: string,
    priority?: number,
  },
}

declare type FormsAppJob = NewFormsAppJob & {
  id: string,
  isSubmitted: boolean,
  createdAt: string,
}

declare type JobSearchParameters = {
  jobId?: string,
  formIds?: number[],
  username?: string,
  externalId?: string,
  isSubmitted?: boolean,
  limit?: number,
  offset: number,
}

type _S3UploadCredentials = {
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
  usernameToken: string,
}

declare type S3UploadCredentials = _S3UploadCredentials & {
  submissionId: string,
}

declare type S3DraftUploadCredentials = _S3UploadCredentials & {
  draftDataId: string,
}

declare type FormSubmissionMeta = {
  submissionId: string,
  formId: number,
  formsAppId: number,
  dateTimeSubmitted: string,
  formName?: string,
  user?: {
    userId: string,
    firstName?: string,
    picture?: string,
    providerUserId?: string,
    providerType?: string,
    fullName?: string,
    lastName?: string,
    email?: string,
    role?: string,
    supervisor?: {
      email?: string,
      fullName?: string,
      providerUserId?: string,
    },
  },
  key?: {
    id: string,
    name: string,
  },
}

declare type FormSubmissionRequest = {
  submissionId: string,
  recaptchas: Array<{
    token: string,
  }>,
}

declare type S3SubmissionData = {
  submission: {
    [name: string]: any,
  },
  definition: Form,
  submissionTimestamp: string,
  formsAppId: number,
  keyId?: string,
  user?: {
    userId: string,
    firstName?: string,
    picture?: string,
    providerUserId?: string,
    providerType?: string,
    fullName?: string,
    lastName?: string,
    email?: string,
  },
}

declare type GeneratePaymentConfigPayload = {
  submissionId: string,
  amount: number,
  redirectUrl: string,
  crn2?: string,
  crn3?: string,
}

declare type NewFormSubmissionFileAccessToken = {
  submissionId: string,
  expiresAt: string,
  s3: {
    region: string,
    bucket: string,
    key: string,
  },
  emailAddress: string,
}

declare type FormSubmissionFileAccessToken = {
  id: string,
  createdAt: string,
} & NewFormSubmissionFileAccessToken

declare type BaseFormSubmissionApproval = {
  previousFormSubmissionApprovalId?: number,

  submissionId: string,
  formId: number,
  formsAppUserId: number,
}

declare type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING',
}

declare type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: number,
  notificationEmailAddress?: string,
  notes?: string,
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED',
  createdAt: string,
  updatedAt: string,
}
