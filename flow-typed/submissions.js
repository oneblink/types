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
  updatedAt: string,
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

declare type S3SubmissionDataDeviceCordova = {
  type: 'CORDOVA',
  cordova?: boolean,
  model?: string,
  platform?: string,
  uuid?: string,
  version?: string,
  manufacturer?: string,
  isVirtual?: boolean,
  serial?: string,
}
declare type S3SubmissionDataDeviceBrowser = {
  type: 'PWA' | 'BROWSER',
  appCodeName: typeof window.navigator.appCodeName,
  appName: typeof window.navigator.appName,
  appVersion: typeof window.navigator.appVersion,
  cookieEnabled: typeof window.navigator.cookieEnabled,
  hardwareConcurrency: typeof window.navigator.hardwareConcurrency,
  language: typeof window.navigator.language,
  maxTouchPoints: typeof window.navigator.maxTouchPoints,
  platform: typeof window.navigator.platform,
  userAgent: typeof window.navigator.userAgent,
  vendor: typeof window.navigator.vendor,
  vendorSub: typeof window.navigator.vendorSub,
  webdriver: typeof window.navigator.webdriver,
}
declare type S3SubmissionDataDevice =
  | S3SubmissionDataDeviceCordova
  | S3SubmissionDataDeviceBrowser

declare type S3SubmissionData = {
  submission: {
    [name: string]: any,
  },
  definition: Form,
  submissionTimestamp: string,
  formsAppId: number,
  ipAddress?: string,
  keyId?: string,
  user?: $PropertyType<_FormSubmissionMeta, 'user'>,
  device?: S3SubmissionDataDevice,
}

declare type NewFormSubmissionFileAccessToken = {
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
