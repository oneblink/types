export type NewEmailTemplate = {
  name: string
  template: string
  formsAppEnvironmentId: number
  type: 'FORM_SUBMISSION_EVENT_PDF' | 'FORMS_APP_WELCOME_EMAIL'
}

export type EmailTemplate = NewEmailTemplate & {
  id: number
  createdAt: string
  updatedAt: string
}
