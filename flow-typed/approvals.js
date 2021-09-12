// @flow
// @ts-nocheck

import { type ConditionalPredicate } from './conditions'
import { type FormServerValidation } from './forms'

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
  isLatest: boolean,
  status:
    | 'PENDING'
    | 'CLARIFICATION_RECEIVED'
    | 'APPROVED'
    | 'CLARIFICATION_REQUIRED'
    | 'CLOSED',
}
declare type FormApprovalFlowInstance = NewFormApprovalFlowInstance & {
  id: number,
  updatedAt: string,
  createdAt: string,
  lastUpdatedBy?: string,
}

type BaseFormSubmissionApproval = {
  group: string,
  notificationEmailAddress?: string[],
  formApprovalFlowInstanceId: number,
  stepLabel: string,
  notes?: string,
  internalNotes?: string,
  updatedBy?: string,
}

declare type NewFormSubmissionApproval = BaseFormSubmissionApproval & {
  status: 'PENDING' | 'CLARIFICATION_REQUIRED',
}

declare type FormSubmissionApproval = BaseFormSubmissionApproval & {
  id: string,
  status: 'PENDING' | 'APPROVED' | 'CLARIFICATION_REQUIRED' | 'CLOSED',
  createdAt: string,
  updatedAt: string,
}

declare type FormApprovalWebhookEvent =
  | 'FORM_SUBMISSION_CREATED'
  | 'CLARIFICATION_SUBMISSION_CREATED'
  | 'STEP_CREATED'
  | 'STEP_APPROVED'
  | 'STEP_CLOSED'
  | 'STEP_CLARIFICATION_REQUIRED'
  | 'APPROVAL_APPROVED'
  | 'APPROVAL_REOPENED'

declare type NewFormApprovalWebhook = {
  endpoint: FormServerValidation,
  secret: string,
  webhookEvents: FormApprovalWebhookEvent[],
  isEnabled: boolean,
  formsAppId: number,
  formIds?: number[],
  label: string,
}

declare type FormApprovalWebhook = NewFormApprovalWebhook & {
  id: number,
  createdAt: string,
  updatedAt: string,
}
