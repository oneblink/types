// @flow

declare type FormElement = {
  name: String,
  id: Number,
}

declare type FormSubmissionEvent = Object

declare type Form = {
  id: number,
  name: string,
  submissionEvents: FormSubmissionEvent[],
  elements: FormElement[],
  isAuthenticated: boolean,
  postSubmissionAction: string,
  redirectUrl?: string,
}

declare type FormSubmissionResult = {
  submission: {
    [key: string]: mixed,
  },
  definition: Form,
  submissionId: string | null,
  submissionTimestamp: string | null,
  payment?: {
    hostedFormUrl: string,
    submissionEvent: FormSubmissionEvent,
  },
  keyId?: string,
  captchaTokens?: string[],
  draftId?: string,
  jobId?: string,
  externalId?: string,
  preFillFormDataId?: string,
}

declare type PendingFormSubmissionResult = FormSubmissionResult & {
  pendingTimestamp: string,
  isSubmitting?: boolean,
  error?: string,
}

declare type FormsAppDraft = {
  title: string,
  formId: number,
  draftId: string,
  updatedAt: string,
  draftDataId: string,
  externalId?: string,
  jobId?: string,
  preFillFormDataId?: string,
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

declare type FormElementDynamicOptionSetEnvironment = {
  url: string,
  formsAppEnvironmentId: number,
}

declare type FormElementDynamicOptionSet = {
  id?: number,
  apiId?: string,
  name: string,
  organisationId: string,
  environments: FormElementDynamicOptionSetEnvironment[],
  createdAt?: string,
  updatedAt?: string,
}

declare type FormElementLookup = FormElementDynamicOptionSet & {
  type: 'ELEMENT' | 'DATA',
  builtInId?: number,
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
