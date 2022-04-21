import type { ConditionalPredicate } from './conditions'
import type { FormServerValidation } from './forms'

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
}
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
  /** Internal notes that are not seen by the user that submitted the form */
  internalNotes?: string
  /** The username of the user that updated the approval */
  updatedBy?: string
  /** The id of a form that should be submitted with approval */
  approvalFormId?: number
}

export type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  /** The status of the approval */
  status: 'PENDING' | 'CLARIFICATION_REQUIRED'
}

export type FormSubmissionApproval = BaseFormSubmissionApproval & {
  /** The unique identifier for the record */
  id: string
  /** The status of the approval */
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED'
  /** The id of a submission that was submitted with approval */
  approvalFormSubmissionId?: string
  /** The date and time (in ISO format) the approval was created */
  createdAt: string
  /** The date and time (in ISO format) the approval was last updated */
  updatedAt: string
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

export type NewFormApprovalWebhook = {
  endpoint: FormServerValidation
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
