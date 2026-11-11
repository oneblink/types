import { DeveloperKeyReference } from '../keys'
import type { UserProfile, WithCommonAssociations } from '../misc'

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
