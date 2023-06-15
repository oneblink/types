import { MiscTypes } from '..'
import type { ConditionalPredicate } from './conditions'
import type { EndpointConfiguration } from './forms'

export type FormApprovalFlowStepBase = {
  /** The group that will be assigned an approval for this step */
  group: string
  /** The unique label for the step */
  label: string
  /** The id of a form that should be submitted with approval */
  approvalFormId?: number
  /** The id of an email template to use for clarification request emails */
  clarificationRequestEmailTemplateId?: number
}
export type FormApprovalFlowStep = FormApprovalFlowStepBase & {
  /** Indicates if step could be conditionally skipped */
  isConditional?: boolean
  /** Indicates if all predicates need to met to determine if the step is skipped */
  requiresAllConditionalPredicates?: boolean
  /** The predicates to determine if the step is skipped */
  conditionalPredicates?: ConditionalPredicate[]
}
/**
 * ### Example
 *
 * ```json
 * {
 *   "group": "group 1",
 *   "label": "Step 1",
 *   "isSkipped": false,
 *   "isConditional": true,
 *   "requiresAllConditionalPredicates": true,
 *   "conditionalPredicates": []
 * }
 * ```
 */
export type FormApprovalFlowInstanceStep = FormApprovalFlowStepBase & {
  /** Indicates if step has been skipped */
  isSkipped: boolean
}

export type NewFormApprovalFlowInstance = {
  /** The unique identifier for the form that was submitted for approval */
  formId: number
  /** The unique identifier for the submission being approved */
  submissionId: string
  /** The unique identifier for the Approvals Forms App associated with the approval */
  approvalsFormsAppId: number
  /**
   * The unique identifier for the previous FormSubmissionApproval that lead to
   * this approval flow
   */
  previousFormSubmissionApprovalId?: string
  /** An array of the FormApprovalFlowInstanceSteps */
  steps: FormApprovalFlowInstanceStep[]
  /**
   * Indicates if the instance is the latest for single submission after
   * clarification requests
   */
  isLatest: boolean
  /** The status of the approval */
  status:
    | 'PENDING'
    | 'CLARIFICATION_RECEIVED'
    | 'APPROVED'
    | 'CLARIFICATION_REQUIRED'
    | 'CLOSED'
  /** Indicates if the payment was skipped for a clarification request */
  preventPayment?: boolean
}

/**
 * ### Example
 *
 * ```json
 * {
 *   "id": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
 *   "formId": 1,
 *   "submissionId": "c1f0f27b-4289-4ce5-9807-bf84971991aa",
 *   "steps": [],
 *   "isLatest": true,
 *   "status": "APPROVED",
 *   "createdAt": "2021-08-06T12:00:00.00Z",
 *   "updatedAt": "2021-08-06T12:00:00.00Z",
 *   "previousFormSubmissionApprovalId": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
 *   "lastUpdatedBy": "username"
 * }
 * ```
 */
export type FormApprovalFlowInstance = NewFormApprovalFlowInstance & {
  /** The unique identifier for the record */
  id: number
  /** The date and time (in ISO format) the approval was last updated */
  updatedAt: string
  /** The date and time (in ISO format) the approval was created */
  createdAt: string
  /** The username of the user that last updated the approval */
  lastUpdatedBy?: string
}

export type NewFormSubmissionApprovalNote = {
  /** The note text */
  note: string
}

export type FormSubmissionApprovalNote = NewFormSubmissionApprovalNote & {
  /** The unique identifier for the record */
  id: string
  /** The date and time (in ISO format) the note was created */
  createdAt: string
  /** The user that created the note */
  createdBy: MiscTypes.UserProfile
  /** The date and time (in ISO format) the note was last updated */
  updatedAt: string
  /** The user that last updated the note */
  lastUpdatedBy: MiscTypes.UserProfile
}

type BaseFormSubmissionApproval = {
  /** The group assigned to the approval */
  group: string
  /** The email addresses of the users to be notified of the result */
  notificationEmailAddress?: string[]
  /** The unique identifier for the FormApprovalFlowInstance of this approval flow */
  formApprovalFlowInstanceId: number
  /** The unique label for the step */
  stepLabel: string
  /** Notes sent to the use that submitted the form */
  notes?: string
  /** Key to associate a canned response with an approval to allow for reporting */
  cannedResponseKey?: string
  /** Internal notes that are not seen by the user that submitted the form */
  internalNotes?: string
  /** The username of the user that updated the approval */
  updatedBy?: string
  /** The id of a form that should be submitted with approval */
  approvalFormId?: number
  /** The id of a form that should be submitted with approval */
  additionalNotes?: FormSubmissionApprovalNote[]
  /** The id of a submission that was submitted with approval */
  approvalFormSubmissionId?: string
}

export type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  /** The status of the approval */
  status: 'PENDING' | 'CLARIFICATION_REQUIRED' | 'APPROVED'
}

/**
 * ### Example
 *
 * ```json
 * {
 *   "id": "a2fgdc5g-79c8-4f97-8d92-cde64b34956s",
 *   "formApprovalFlowInstanceId": 1,
 *   "group": "group1",
 *   "stepLabel": "Step 1",
 *   "status": "APPROVED",
 *   "createdAt": "2021-08-06T12:00:00.00Z",
 *   "updatedAt": "2021-08-06T12:00:00.00Z",
 *   "notificationEmailAddress": ["username@oneblink.io"],
 *   "notes": "Notes",
 *   "internalNotes": "Internal Notes",
 *   "updatedBy": "username"
 * }
 * ```
 */
export type FormSubmissionApproval = BaseFormSubmissionApproval & {
  /** The unique identifier for the record */
  id: string
  /** The status of the approval */
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED'
  /** The date and time (in ISO format) the approval was created */
  createdAt: string
  /** The date and time (in ISO format) the approval was last updated */
  updatedAt: string
  /** Prevent the payment on a clarification request */
  preventPayment?: boolean
}

export type FormApprovalWebhookEvent =
  | 'FORM_SUBMISSION_CREATED'
  | 'CLARIFICATION_SUBMISSION_CREATED'
  | 'STEP_CREATED'
  | 'STEP_APPROVED'
  | 'STEP_CLOSED'
  | 'STEP_CLARIFICATION_REQUIRED'
  | 'APPROVAL_APPROVED'
  | 'APPROVAL_REOPENED'
  | 'NOTE_CREATED'
  | 'NOTE_UPDATED'
  | 'NOTE_DELETED'

export type NewFormApprovalWebhook = {
  endpoint: EndpointConfiguration
  secret: string
  webhookEvents: FormApprovalWebhookEvent[]
  isEnabled: boolean
  formsAppId: number
  formIds?: number[]
  label: string
}

export type FormApprovalWebhook = NewFormApprovalWebhook & {
  id: number
  createdAt: string
  updatedAt: string
}

export type FormApprovalCannedResponse = {
  /** The unique key for the response to allow for reporting */
  key: string
  /** The human readable text to represent the response */
  label: string
  /** The text to prefill as the notes for an approval (should respect line breaks) */
  notes: string
}

export type NewFormApprovalWebhookEventRecord = {
  formApprovalFlowInstanceId: number
  formApprovalWebhookId: number
  event: {
    type: FormApprovalWebhookEvent
    formSubmissionApprovalId?: string
    formApprovalFlowInstanceId?: number
    noteId?: string
    secret: string
  }
  error?: string
  endpointStatus?: number
  finishedAt?: string
  stage: 'APPROVAL' | 'REPLAY'
}

export type FormApprovalWebhookEventRecord =
  NewFormApprovalWebhookEventRecord & {
    id: number
    createdAt: string
  }
