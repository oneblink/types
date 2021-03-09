export type FormApprovalFlowStep = {
  type: 'SINGLE'
  username: string
  label: string
}
export type NewFormApprovalFlow = {
  formId: number
  steps: FormApprovalFlowStep[]
}
export type FormApprovalFlow = NewFormApprovalFlow & {
  createdAt: string
  updatedAt: string
}

export type NewFormApprovalFlowInstance = NewFormApprovalFlow & {
  submissionId: string
  approvalsFormsAppId: number
  previousFormSubmissionApprovalId?: string
}
export type FormApprovalFlowInstance = NewFormApprovalFlowInstance & {
  id: number
  createdAt: string
}

type BaseFormSubmissionApproval = {
  username: string
  notificationEmailAddress?: string
  formApprovalFlowInstanceId: number
  stepLabel: string
}

export type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING'
}

export type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: string
  notes?: string
  internalNotes?: string
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED'
  createdAt: string
  updatedAt: string
}
