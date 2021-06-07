import type { ConditionalPredicate } from './conditions'

export type FormSubmissionEventType =
  | 'CALLBACK'
  | 'PDF'
  | 'ONEBLINK_API'
  | 'TRIM'
  | 'CIVICA_CRM'
  | 'CP_PAY'
  | 'BPOINT'
  | 'CP_HCMS'
  | 'WESTPAC_QUICK_WEB'

export type FormSubmissionEventConditional = {
  conditionallyExecute?: boolean
  requiresAllConditionallyExecutePredicates?: boolean
  conditionallyExecutePredicates?: ConditionalPredicate[]
}

export type CallbackSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CALLBACK'
  configuration: {
    url: string
    secret?: string
  }
  isDraft: boolean
}

export type PdfSubmissionEvent = FormSubmissionEventConditional & {
  type: 'PDF'
  configuration: {
    email: string
    emailSubjectLine?: string
    pdfFileName?: string
    includeSubmissionIdInPdf?: boolean
    excludedElementIds?: string[]
  }
  isDraft: boolean
}

export type OneBlinkAPISubmissionEventConfiguration = {
  apiId: string
  apiEnvironment: string
  apiEnvironmentRoute: string
  secret?: string
}

export type OneBlinkAPISubmissionEvent = FormSubmissionEventConditional & {
  type: 'ONEBLINK_API'
  configuration: OneBlinkAPISubmissionEventConfiguration
  isDraft: boolean
}

export type TrimUriOption = {
  label: string
  uri: number
}

export type TrimSubmissionEvent = FormSubmissionEventConditional & {
  type: 'TRIM'
  configuration: {
    environmentId: string
    recordTitle?: string
    container: TrimUriOption
    recordType: TrimUriOption
    actionDefinition: TrimUriOption
    location: TrimUriOption
    includeSubmissionIdInPdf?: boolean
    author?: TrimUriOption
  }
  isDraft: boolean
}

export type CivicaCrmSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CIVICA_CRM'
  configuration: {
    environmentId: string
    civicaCategoryId: number
    mapping: Array<{
      civicaCategoryItemNumber: number
      formElementId: string
    }>
    pdfFileName?: string
    includeSubmissionIdInPdf?: boolean
    excludedElementIds?: string[]
  }
  isDraft: boolean
}

export type CPHCMSSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CP_HCMS'
  configuration: {
    contentTypeName: string
    encryptedElementIds?: string[]
    encryptPdf?: boolean
  }
  isDraft: boolean
}

export type CPPaySubmissionEvent = {
  type: 'CP_PAY'
  configuration: {
    elementId: string
    gatewayId: string
  }
  isDraft: boolean
}

export type BPOINTSubmissionEvent = {
  type: 'BPOINT'
  configuration: {
    elementId: string
    environmentId: string
    crn2?: string
    crn3?: string
  }
  isDraft: boolean
}

export type WestpacQuickWebSubmissionEvent = {
  type: 'WESTPAC_QUICK_WEB'
  configuration: {
    elementId: string
    environmentId: string
    customerReferenceNumber: string
  }
  isDraft: boolean
}

export type PaymentSubmissionEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent
  | WestpacQuickWebSubmissionEvent

export type FormSubmissionEvent =
  | CallbackSubmissionEvent
  | PdfSubmissionEvent
  | OneBlinkAPISubmissionEvent
  | TrimSubmissionEvent
  | CPHCMSSubmissionEvent
  | PaymentSubmissionEvent

export type WebhookSubscription = {
  id: number
  createdAt?: Date
  callbackUrl: string
  organisationId: string
  keyId: string
}

export interface S3SubmissionTags {
  externalId?: string
  jobId?: string
  payment?: 'PENDING' | 'SUCCEEDED' | 'FAILED'
  userToken?: string
  usernameToken?: string
  previousFormSubmissionApprovalId?: string
}

export type BaseFormSubmissionLambdaEvent = {
  submissionId: string
  formId: number
  organisationId: string
  bucketName: string
  key: string
  isDraft: boolean
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
  lambda?: string
} & S3SubmissionTags

export type FormSubmissionLambdaEvent<T> = BaseFormSubmissionLambdaEvent & {
  submissionEvent: T
}

export type WebhookSubmissionEventPayload = {
  formId: number
  submissionId: string
  isDraft: boolean
  submissionTimestamp: string
  jobId?: string
  externalId?: string
  userToken?: string
  username?: string
  secret?: string
}
