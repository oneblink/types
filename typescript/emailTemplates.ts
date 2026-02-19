import { WithCommonAssociations, WithEnvironmentAssociation } from './misc'

export type EmailTemplateEnvironment = WithEnvironmentAssociation & {
  template: string
}

export type NewEmailTemplate = WithCommonAssociations & {
  name: string

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
