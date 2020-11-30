// @flow

declare type NewFormsAppEnvironment = {
  name: string,
  description?: string,
  organisationId: string,
  slug: string,
  cloneOptions?: {
    sourceFormsAppEnvironmentId: number,
    isCloningFormElementOptionsSets: boolean,
    isCloningFormElementLookups: boolean,
    isCloningFormSubmissionEvents: boolean,
    isCloningFormPostSubmissionActions: boolean,
  },
}

declare type FormsAppEnvironment = {
  id: number,
  createdAt: Date,
  updatedAt: Date,
} & NewFormsAppEnvironment

declare type FormMigrationOptions = {
  formsAppEnvironmentId: number,
  elements: boolean,
  submissionEvents: boolean,
  tags: boolean,
  postSubmissionAction: boolean,
  embeddedForms?: Array<{
    sourceElementId: string,
    targetFormId: number,
  }>,
}
declare type FormMigrationData = {
  sourceFormId: number,
  targetFormId?: number,
} & FormMigrationOptions
