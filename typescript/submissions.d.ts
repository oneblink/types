import { Form, FormElementWithName } from './forms'
import { NoU, UserProfile } from './misc'
import { S3ObjectCredentials } from './aws'

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
  updatedAt?: string
  createdAt?: string
}

export interface NewFormsAppJob {
  username: string
  formId: number
  draft?: FormsAppDraft
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
  updatedAt: string
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

type _FormSubmissionMeta = {
  submissionId: string
  formId: number
  formsAppId: number
  dateTimeSubmitted: string
  formName?: string
  user?: UserProfile
  externalId?: string
  jobId?: string
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

export type S3SubmissionDataDeviceCordova = {
  type: 'CORDOVA'
  cordova?: boolean
  model?: string
  platform?: string
  uuid?: string
  version?: string
  manufacturer?: string
  isVirtual?: boolean
  serial?: string
}
export type S3SubmissionDataDeviceBrowser = {
  type: 'PWA' | 'BROWSER'
  appCodeName: typeof window.navigator.appCodeName
  appName: typeof window.navigator.appName
  appVersion: typeof window.navigator.appVersion
  cookieEnabled: typeof window.navigator.cookieEnabled
  hardwareConcurrency: typeof window.navigator.hardwareConcurrency
  language: typeof window.navigator.language
  maxTouchPoints: typeof window.navigator.maxTouchPoints
  platform: typeof window.navigator.platform
  userAgent: typeof window.navigator.userAgent
  vendor: typeof window.navigator.vendor
  vendorSub: typeof window.navigator.vendorSub
  webdriver: typeof window.navigator.webdriver
}
export type S3SubmissionDataDevice =
  | S3SubmissionDataDeviceCordova
  | S3SubmissionDataDeviceBrowser

export type S3SubmissionData = {
  submission: {
    [name: string]: any
  }
  definition: Form
  submissionTimestamp: string
  formsAppId: number
  ipAddress?: string
  keyId?: string
  user?: _FormSubmissionMeta['user']
  device?: S3SubmissionDataDevice
}

export type NewFormSubmissionFileAccessToken = {
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
  uploadedAt?: string
}

type _BaseFormStoreRecord = {
  _id: string
  submissionId: string
  formsAppId: number
  user?: UserProfile
  externalId?: string
  jobId?: string
  key?: {
    id: string
    name: string
  }
  definition: Form
  submission: Record<string, unknown>
  device?: S3SubmissionDataDevice
  ipAddress?: string
}

export type DbFormStoreRecord = _BaseFormStoreRecord & {
  dateTimeSubmitted: Date
  createdAt: Date
}
export type NewDbFormStoreRecord = Omit<DbFormStoreRecord, '_id'>

export type FormStoreRecord = _BaseFormStoreRecord & {
  dateTimeSubmitted: string
  createdAt: string
}

export type FormStoreDefinition = {
  formId: number
  formElements: FormElementWithName[]
}
