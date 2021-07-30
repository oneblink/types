// @flow

import { type UserProfile } from './misc'
import { type S3ObjectCredentials } from './aws'

declare type NewFormsAppDraft = {
  title: string,
  formId: number,
  externalId: ?string,
  jobId: ?string,
  previousFormSubmissionApprovalId?: string,
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

type _S3UploadCredentials = S3ObjectCredentials & {
  submissionId: string,
  submissionTimestamp: string,
  usernameToken: string,
}

declare type S3UploadCredentials = _S3UploadCredentials & {
  submissionId: string,
}

declare type S3DraftUploadCredentials = _S3UploadCredentials & {
  draftDataId: string,
}

type _FormSubmissionMeta = {
  submissionId: string,
  formId: number,
  formsAppId: number,
  dateTimeSubmitted: string,
  formName?: string,
  user?: UserProfile,
  externalId?: string,
  jobId?: string,
}

declare type NewFormSubmissionMeta = _FormSubmissionMeta & {
  keyId?: string,
}

declare type FormSubmissionMeta = _FormSubmissionMeta & {
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
  user?: $PropertyType<_FormSubmissionMeta, 'user'>,
}

declare type NewFormSubmissionFileAccessToken = {
  submissionId: string,
  expiresAt: string,
  s3: $PropertyType<S3ObjectCredentials, 's3'>,
  emailAddress: string,
}

declare type FormSubmissionFileAccessToken = {
  id: string,
  createdAt: string,
} & NewFormSubmissionFileAccessToken

declare type FormSubmissionAttachment = {
  s3: {
    bucket: string,
    key: string,
    region: string,
  },
  url: string,
  contentType: string,
  fileName: string,
  id: string,
  isPrivate: boolean,
}
