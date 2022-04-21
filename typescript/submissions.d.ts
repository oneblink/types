import { Form, FormElementWithName } from './forms'
import { NoU, UserProfile } from './misc'
import { S3ObjectCredentials } from './aws'

export interface NewFormsAppDraft {
  /** The title input by the user to display the draft */
  title: string
  /** The id of the form the draft was saved against */
  formId: number
  /** The external id provided by a developer */
  externalId: string | NoU
  /** The id of the job associated with the draft */
  jobId: string | NoU
  /**
   * The previous form submission approval id, if the draft is a response to a
   * clarification request on the submission approval
   */
  previousFormSubmissionApprovalId?: string
}

export type FormsAppDraft = NewFormsAppDraft & {
  /** The id of the draft */
  draftId: string
  /** The id of the draft data stored */
  draftDataId?: string
  /** The date and time (in ISO format) the draft was last updated */
  updatedAt?: string
  /** The date and time (in ISO format) the draft was created */
  createdAt?: string
}

export interface NewFormsAppJob {
  username: string
  /** The id of the form associated with the job */
  formId: number
  /** If the job was started and saved as a draft, this will include the draft. */
  draft?: FormsAppDraft
  /** The external id set when the job was created */
  externalId?: string
  /** The id of the prefill data associated with the job */
  preFillFormDataId?: string
  /** The job details */
  details: {
    /** The job title */
    title: string
    /** The job key */
    key?: string
    /** The job description */
    description?: string
    /** The job type */
    type?: string
    /** The job priority */
    priority?: number
  }
}

export type FormsAppJob = NewFormsAppJob & {
  /** The id the job */
  id: string
  /** Determine if the Job has been submitted */
  isSubmitted: boolean
  /** The date and time (in ISO format) the job was created */
  createdAt: string
  /** The date and time (in ISO format) the job was last updated */
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
  /** The id of the submission data */
  submissionId: string
  /** The id of the OneBlink Form */
  formId: number
  /** The id of the Forms App submitting for */
  formsAppId: number
  /** The date and time (in ISO format) the form was submitted */
  dateTimeSubmitted: string
  formName?: string
  /** Information about the user that submitted the form */
  user?: UserProfile
  externalId?: string
  jobId?: string
}

export type NewFormSubmissionMeta = _FormSubmissionMeta & {
  /** The id of the key used to submit the form */
  keyId?: string
}

export type FormSubmissionMeta = _FormSubmissionMeta & {
  /** Information about the key that was used to submitted the form */
  key?: {
    /** The id of the key */
    id: string
    /** The name of the key */
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
    [name: string]: unknown
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
  key?: FormSubmissionMeta['key']
  definition: Form
  submission: S3SubmissionData['submission']
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
