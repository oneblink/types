export type FormApprovalFlowStep = {
  type: 'SINGLE'
  username: string
  label: string
}
export type NewFormApprovalFlow = {
  formId: number
  steps: FormApprovalFlowStep[]
  approvalsFormsAppId: number
}
export type FormApprovalFlow = NewFormApprovalFlow & {
  createdAt: string
  updatedAt: string
}

export type NewFormApprovalFlowInstance = NewFormApprovalFlow & {
  submissionId: string
  formId: number
}
export type FormApprovalFlowInstance = NewFormApprovalFlowInstance & {
  id: number
  createdAt: string
}

type BaseFormSubmissionApproval = {
  previousFormSubmissionApprovalId?: number
  username: string
  notificationEmailAddress?: string
  formApprovalFlowInstanceId: number
  stepLabel: string
}

export type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING'
}

export type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: number
  notes?: string
  internalNotes?: string
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED'
  createdAt: string
  updatedAt: string
}
