export type NewEmailTemplate = {
  name: string
  template: string
  formsAppEnvironmentId: number
}

export type EmailTemplate = NewEmailTemplate & {
  id: number
  createdAt: string
  updatedAt: string
}
