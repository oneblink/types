export type EmailTemplateEnvironment = {
  template: string
  formsAppEnvironmentId: number
}

export type NewEmailTemplate = {
  name: string
  organisationId: string
  environments: EmailTemplateEnvironment[]
  type:
    | 'FORM_SUBMISSION_EVENT_PDF'
    | 'FORMS_APP_WELCOME_EMAIL'
    | 'APPROVAL_CLARIFICATION_REQUEST'
    | 'APPROVAL_APPROVED'
    | 'APPROVAL_DENIED'
    | 'TO_APPROVER_APPROVAL_CREATED'
    | 'FORM_SUBMISSION_EVENT_EMAIL'
}

export type EmailTemplate = NewEmailTemplate & {
  id: number
  createdAt: string
  updatedAt: string
}
