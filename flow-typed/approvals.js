// @flow
// @ts-nocheck

import { type ConditionalPredicate } from './conditions'

declare type FormApprovalFlowStepBase = {
  group: string,
  label: string,
}
declare type FormApprovalFlowStep = FormApprovalFlowStepBase & {
  isConditional?: boolean,
  requiresAllConditionalPredicates?: boolean,
  conditionalPredicates?: ConditionalPredicate[],
}
declare type FormApprovalFlowInstanceStep = FormApprovalFlowStepBase & {
  isSkipped: boolean,
}

declare type NewFormApprovalFlow = {
  formId: number,
  steps: FormApprovalFlowStep[],
}
declare type FormApprovalFlow = NewFormApprovalFlow & {
  createdAt: string,
  updatedAt: string,
}

declare type NewFormApprovalFlowInstance = {
  formId: number,
  submissionId: string,
  approvalsFormsAppId: number,
  previousFormSubmissionApprovalId?: string,
  steps: FormApprovalFlowInstanceStep[],
  status:
    | 'PENDING'
    | 'CLARIFICATION_RECEIVED'
    | 'APPROVED'
    | 'CLARIFICATION_REQUIRED'
    | 'CLOSED',
}
declare type FormApprovalFlowInstance = NewFormApprovalFlowInstance & {
  id: number,
  createdAt: string,
}

type BaseFormSubmissionApproval = {
  group: string,
  notificationEmailAddress?: string[],
  formApprovalFlowInstanceId: number,
  stepLabel: string,
}

declare type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING',
}

declare type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: string,
  notes?: string,
  internalNotes?: string,
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED',
  createdAt: string,
  updatedAt: string,
  updatedBy?: string,
}
