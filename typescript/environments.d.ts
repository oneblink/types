export interface NewFormsAppEnvironment {
  name: string
  description?: string
  organisationId: string
  slug: string
  cloneOptions?: {
    sourceFormsAppEnvironmentId: number
    isCloningFormElementOptionsSets: boolean
    isCloningFormElementLookups: boolean
    isCloningFormSubmissionEvents: boolean
    isCloningFormApprovalSteps: boolean
    isCloningFormPostSubmissionActions: boolean
    isCloningFormServerValidation: boolean
    isCloningFormExternalIdGeneration: boolean
    isCloningFormExternalIdGenerationOnSubmit: boolean
    isCloningFormPersonalisation: boolean
  }
}

export type FormsAppEnvironment = {
  id: number
  createdAt: Date
  updatedAt: Date
} & NewFormsAppEnvironment

export interface FormMigrationOptions {
  formsAppEnvironmentId: number
  elements: boolean
  approvalSteps: boolean
  submissionEvents: boolean
  tags: boolean
  postSubmissionAction: boolean
  serverValidation: boolean
  externalIdGeneration: boolean
  externalIdGenerationOnSubmit: boolean
  personalisation: boolean
  embeddedForms?: Array<{
    sourceElementId: string
    targetFormId: number
  }>
}

export type FormMigrationData = {
  sourceFormId: number
  targetFormId?: number
} & FormMigrationOptions
