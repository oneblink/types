// Event declarations live in ./submission-events so a prompt can include only
// the files for the event types a tenant supports. This module re-exports those
// declarations and the full unions. Processing types are defined here because
// they are not event definitions and are not included in the prompt.
import { DeveloperKeyReference } from './keys'
import type { UserProfile, WithCommonAssociations } from './misc'
export type {
  FormEventConditional,
  FormEventBase,
  ApprovalFormsInclusionConfiguration,
  PdfSubmissionEventEmailTemplateMapping,
  PDFConfiguration,
  EmailConfiguration,
} from './submission-events/common'
export type { FormPaymentEventAmountConfiguration } from './submission-events/payment-amount'
export type { CallbackSubmissionEvent } from './submission-events/callback'
export type { PowerAutomateFlowSubmissionEvent } from './submission-events/power-automate-flow'
export type { Symphony3SmartGlueSubmissionEvent } from './submission-events/symphony-3-smart-glue'
export type { CPIntegrationHubWebhookSubmissionEvent } from './submission-events/cp-integration-hub-webhook'
export type { PdfSubmissionEvent } from './submission-events/pdf'
export type {
  EmailSubmissionEvent,
  EmailOnlySubmissionEvent,
} from './submission-events/email'
export type { OneBlinkAPISubmissionEvent } from './submission-events/oneblink-api'
export type {
  TrimUriOption,
  TrimSubmissionEvent,
} from './submission-events/trim'
export type {
  CivicaRecord,
  CivicaCustomerContactMethod,
  CivicaCrmSubmissionEventMapping,
  CivicaCrmSubmissionEvent,
} from './submission-events/civica-crm'
export type { CPHCMSSubmissionEvent } from './submission-events/cp-hcms'
export type {
  CPPayPaymentDisplayDetailKey,
  CPPaySubmissionEvent,
} from './submission-events/cp-pay'
export type {
  BPointPaymentDisplayDetailKey,
  BPOINTSubmissionEvent,
} from './submission-events/bpoint'
export type {
  WestpacQuickStreamPaymentDisplayDetailKey,
  WestpacQuickStreamSubmissionEvent,
} from './submission-events/westpac-quick-stream'
export type {
  NSWGovPayPaymentDisplayDetailKey,
  NSWGovPaySubmissionEvent,
} from './submission-events/nsw-gov-pay'
export type { PaymentDisplayDetailKey } from './submission-events/payment-display-detail-key'
export type { FormElementMapping } from './submission-events/form-element-mapping'
export type {
  BaseFreshdeskSubmissionEventFieldMapping,
  FreshdeskSubmissionEventFieldMapping,
  FreshdeskCreateTicketSubmissionEvent,
} from './submission-events/freshdesk-create-ticket'
export type { FreshdeskAddNoteToTicketSubmissionEvent } from './submission-events/freshdesk-add-note-to-ticket'
export type {
  MicrosoftSubmissionEventBase,
  SharepointSubmissionEventBase,
} from './submission-events/microsoft'
export type { NylasSubmissionEvent } from './submission-events/nylas'
export type {
  SharepointColumnResourceDefinitionBase,
  SharepointCreateListItemSubmissionEventMapping,
  SharepointCreateListItemSubmissionEvent,
} from './submission-events/sharepoint-create-list-item'
export type { SharepointStoreFilesSubmissionEvent } from './submission-events/sharepoint-store-files'
export type {
  ExcelFileColumnResourceDefinitionBase,
  ExcelAddRowSubmissionEventMapping,
  ExcelAddRowSubmissionEvent,
} from './submission-events/excel-add-row'
export type { CivicRecCompleteCheckoutSubmissionEvent } from './submission-events/civic-rec-complete-checkout'
export type {
  GoodToGoUpdateAssetResourceDefinition,
  GoodToGoUpdateAssetSubmissionEventMapping,
  GoodToGoUpdateAssetSubmissionEvent,
} from './submission-events/good-to-go-update-asset'
export type {
  SalesforceObjectRecordFieldResourceDefinition,
  SalesforceCreateObjectRecordSubmissionEventMapping,
  SalesforceCreateObjectRecordSubmissionEvent,
} from './submission-events/salesforce-create-object-record'
export type {
  LuminRequestSignatureValueMapping,
  LuminRequestSignatureSignerConfiguration,
  LuminTemplateMergeTagResourceDefinition,
  LuminTemplateFieldResourceDefinition,
  LuminTemplateVariableResourceDefinition,
  LuminRequestSignatureMergeTagMapping,
  LuminRequestSignatureFieldMapping,
  LuminRequestSignatureVariableMapping,
  LuminRequestSignatureConfiguration,
  LuminRequestSignatureSubmissionEvent,
} from './submission-events/lumin-request-signature'
export type NewWebhookSubscription = {
  callbackUrl: string
  organisationId: string
  keyId: string
  label?: string
  formId?: number
  trigger?: 'AFTER_SUBMISSION' | 'AFTER_APPROVAL'
}

export type WebhookSubscription = NewWebhookSubscription & {
  id: number
  createdAt: string
}

export type S3SubmissionTags = {
  /**
   * @deprecated No longer stored as an S3 tag. It is now stored in the S3
   *   object JSON data.
   */
  externalId?: string
  jobId?: string
  /**
   * @deprecated `username` should be stored as a claim in token instead of
   *   using `userToken` when submitting forms using a developer key.
   */
  userToken?: string
  previousFormSubmissionApprovalId?: string
}

export type BaseFormSubmissionProcessing = WithCommonAssociations & {
  submissionId: string
  formId: number
  bucketName: string
  key: string
  isDraft: boolean
  submissionTimestamp: string
  formsAppId?: number
  keyId?: string
  user?: UserProfile
  developerKey?: DeveloperKeyReference
  timezone: string
  externalId?: string
} & S3SubmissionTags

export type FormSubmissionProcessingEvent<T> = BaseFormSubmissionProcessing & {
  type: 'EVENT'
  submissionEvent: T
  formSubmissionWorkflowEventId: number
  /**
   * The delay in seconds before the event will be processed. This is to allow
   * for retries to be delayed to give third party systems time to recover.
   */
  delayInSeconds: number
  /**
   * A number representing the attempt. First attempt will be 1, second attempt
   * will be 2, and so on.
   */
  attempt: number
  /**
   * Represents the number of failed attempts before an error will be reported
   * to the customer. If the event succeeds before reaching the maximum
   * attempts, the customer will be notified. If the event is not configured to
   * allow retries, the `maxAttempts` should be 1.
   */
  maxAttempts: number
}

export type FormSubmissionProcessingFormStore = BaseFormSubmissionProcessing & {
  type: 'FORM_STORE'
}

export type FormSubmissionProcessing<T = undefined> =
  | FormSubmissionProcessingEvent<T>
  | FormSubmissionProcessingFormStore

export type WebhookSubmissionEventPayload = {
  formsAppId?: number
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

import type { BPOINTSubmissionEvent } from './submission-events/bpoint'
import type { CallbackSubmissionEvent } from './submission-events/callback'
import type { CivicRecCompleteCheckoutSubmissionEvent } from './submission-events/civic-rec-complete-checkout'
import type { CivicaCrmSubmissionEvent } from './submission-events/civica-crm'
import type { CPIntegrationHubWebhookSubmissionEvent } from './submission-events/cp-integration-hub-webhook'
import type { CPHCMSSubmissionEvent } from './submission-events/cp-hcms'
import type { CPPaySubmissionEvent } from './submission-events/cp-pay'
import type { EmailOnlySubmissionEvent } from './submission-events/email'
import type { ExcelAddRowSubmissionEvent } from './submission-events/excel-add-row'
import type { FreshdeskAddNoteToTicketSubmissionEvent } from './submission-events/freshdesk-add-note-to-ticket'
import type { FreshdeskCreateTicketSubmissionEvent } from './submission-events/freshdesk-create-ticket'
import type { GoodToGoUpdateAssetSubmissionEvent } from './submission-events/good-to-go-update-asset'
import type { LuminRequestSignatureSubmissionEvent } from './submission-events/lumin-request-signature'
import type { NSWGovPaySubmissionEvent } from './submission-events/nsw-gov-pay'
import type { NylasSubmissionEvent } from './submission-events/nylas'
import type { OneBlinkAPISubmissionEvent } from './submission-events/oneblink-api'
import type { PdfSubmissionEvent } from './submission-events/pdf'
import type { PowerAutomateFlowSubmissionEvent } from './submission-events/power-automate-flow'
import type { SalesforceCreateObjectRecordSubmissionEvent } from './submission-events/salesforce-create-object-record'
import type { SharepointCreateListItemSubmissionEvent } from './submission-events/sharepoint-create-list-item'
import type { SharepointStoreFilesSubmissionEvent } from './submission-events/sharepoint-store-files'
import type { Symphony3SmartGlueSubmissionEvent } from './submission-events/symphony-3-smart-glue'
import type { TrimSubmissionEvent } from './submission-events/trim'
import type { WestpacQuickStreamSubmissionEvent } from './submission-events/westpac-quick-stream'

export type FormPaymentEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent
  | WestpacQuickStreamSubmissionEvent
  | NSWGovPaySubmissionEvent

export type FormSchedulingEvent = NylasSubmissionEvent
export type FormWorkflowEvent =
  | CallbackSubmissionEvent
  | PowerAutomateFlowSubmissionEvent
  | CPIntegrationHubWebhookSubmissionEvent
  | PdfSubmissionEvent
  | OneBlinkAPISubmissionEvent
  | TrimSubmissionEvent
  | CPHCMSSubmissionEvent
  | CivicaCrmSubmissionEvent
  | EmailOnlySubmissionEvent
  | FreshdeskCreateTicketSubmissionEvent
  | FreshdeskAddNoteToTicketSubmissionEvent
  | SharepointCreateListItemSubmissionEvent
  | SharepointStoreFilesSubmissionEvent
  | CivicRecCompleteCheckoutSubmissionEvent
  | GoodToGoUpdateAssetSubmissionEvent
  | ExcelAddRowSubmissionEvent
  | Symphony3SmartGlueSubmissionEvent
  | SalesforceCreateObjectRecordSubmissionEvent
  | LuminRequestSignatureSubmissionEvent

export type FormEvent =
  | FormPaymentEvent
  | FormSchedulingEvent
  | FormWorkflowEvent

export type FormPaymentEventType = FormPaymentEvent['type']
export type FormSchedulingEventType = FormSchedulingEvent['type']
export type FormWorkflowEventType = FormWorkflowEvent['type']
export type FormEventType = FormEvent['type']
