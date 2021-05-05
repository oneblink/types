// @flow

import { type ConditionalPredicate } from './conditions'

declare type FormSubmissionEventType =
  | 'CALLBACK'
  | 'PDF'
  | 'ONEBLINK_API'
  | 'TRIM'
  | 'CP_PAY'
  | 'BPOINT'
  | 'CP_HCMS'

declare type FormSubmissionEventConditional = {
  conditionallyExecute?: boolean,
  requiresAllConditionallyExecutePredicates?: boolean,
  conditionallyExecutePredicates?: Array<ConditionalPredicate>,
}

declare type CallbackSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CALLBACK',
  configuration: {
    url: string,
    secret?: string,
  },
  isDraft: boolean,
}

declare type PdfSubmissionEvent = FormSubmissionEventConditional & {
  type: 'PDF',
  configuration: {
    email: string,
    emailSubjectLine: ?string,
    pdfFileName: ?string,
    includeSubmissionIdInPdf?: boolean,
    excludedElementIds?: string[],
  },
  isDraft: boolean,
}

declare type OneBlinkAPISubmissionEventConfiguration = {
  apiId: string,
  apiEnvironment: string,
  apiEnvironmentRoute: string,
  secret?: string,
}

declare type OneBlinkAPISubmissionEvent = FormSubmissionEventConditional & {
  type: 'ONEBLINK_API',
  configuration: OneBlinkAPISubmissionEventConfiguration,
  isDraft: boolean,
}

declare type TrimUriOption = {
  label: string,
  uri: number,
}

declare type TrimSubmissionEvent = FormSubmissionEventConditional & {
  type: 'TRIM',
  configuration: {
    environmentId: string,
    recordTitle: string | void,
    container: TrimUriOption,
    recordType: TrimUriOption,
    actionDefinition: TrimUriOption,
    location: TrimUriOption,
    includeSubmissionIdInPdf?: boolean,
    author?: TrimUriOption,
  },
  isDraft: boolean,
}

declare type CPHCMSSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CP_HCMS',
  configuration: {
    contentTypeName: string,
    encryptedElementIds: ?Array<string>,
  },
  isDraft: boolean,
}

declare type CPPaySubmissionEvent = {
  type: 'CP_PAY',
  configuration: {
    elementId: string,
    gatewayId: string,
  },
  isDraft: boolean,
}

declare type BPOINTSubmissionEvent = {
  type: 'BPOINT',
  configuration: {
    elementId: string,
    environmentId: string,
    crn2?: string,
    crn3?: string,
  },
  isDraft: boolean,
}

declare export type FormSubmissionEvent =
  | CallbackSubmissionEvent
  | PdfSubmissionEvent
  | OneBlinkAPISubmissionEvent
  | TrimSubmissionEvent
  | CPHCMSSubmissionEvent
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent

declare type PaymentSubmissionEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent

declare type WebhookSubscription = {
  id: number,
  createdAt?: Date,
  callbackUrl: string,
  organisationId: string,
  keyId: string,
}

declare interface S3SubmissionTags {
  externalId?: string;
  jobId?: string;
  payment?: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  userToken?: string;
  usernameToken?: string;
  previousFormSubmissionApprovalId?: string;
}

declare type BaseFormSubmissionLambdaEvent = {
  submissionId: string,
  formId: number,
  organisationId: string,
  bucketName: string,
  key: string,
  isDraft: boolean,
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
  lambda?: string,
} & S3SubmissionTags

declare type FormSubmissionLambdaEvent<T> = BaseFormSubmissionLambdaEvent & {
  submissionEvent: T,
}

declare type WebhookSubmissionEventPayload = {
  formId: number,
  submissionId: string,
  isDraft: boolean,
  submissionTimestamp: string,
  jobId?: string,
  externalId?: string,
  userToken?: string,
  username?: string,
  secret?: string,
}
