import type { ConditionalPredicate } from './conditions'
import type { FormServerValidation } from './forms'

export type FormApprovalFlowStepBase = {
  group: string
  label: string
}
export type FormApprovalFlowStep = FormApprovalFlowStepBase & {
  isConditional?: boolean
  requiresAllConditionalPredicates?: boolean
  conditionalPredicates?: ConditionalPredicate[]
}
export type FormApprovalFlowInstanceStep = FormApprovalFlowStepBase & {
  isSkipped: boolean
}

export type NewFormApprovalFlowInstance = {
  formId: number
  submissionId: string
  approvalsFormsAppId: number
  previousFormSubmissionApprovalId?: string
  steps: FormApprovalFlowInstanceStep[]
  isLatest: boolean
  status:
    | 'PENDING'
    | 'CLARIFICATION_RECEIVED'
    | 'APPROVED'
    | 'CLARIFICATION_REQUIRED'
    | 'CLOSED'
}
export type FormApprovalFlowInstance = NewFormApprovalFlowInstance & {
  id: number
  updatedAt: string
  createdAt: string
  lastUpdatedBy?: string
}

type BaseFormSubmissionApproval = {
  group: string
  notificationEmailAddress?: string[]
  formApprovalFlowInstanceId: number
  stepLabel: string
  notes?: string
  internalNotes?: string
  updatedBy?: string
}

export type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING' | 'CLARIFICATION_REQUIRED'
}

export type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: string
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED'
  createdAt: string
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
