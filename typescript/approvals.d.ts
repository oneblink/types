import type { ConditionalPredicate } from './conditions'

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

export type NewFormApprovalFlow = {
  formId: number
  steps: FormApprovalFlowStep[]
}
export type FormApprovalFlow = NewFormApprovalFlow & {
  createdAt: string
  updatedAt: string
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
