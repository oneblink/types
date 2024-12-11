export type FormsAppEnvironmentColours = {
  /** Foreground colour of banner in Forms App */
  foregroundColour?: string
  /** Highlight colour for elements that should stand out */
  highlightColour?: string
  /** Contrast colour applied against the highlight colour */
  contrastColour?: string
}

export type BaseFormsAppEnvironmentStyles = FormsAppEnvironmentColours & {
  /** CSS applied to the Forms App */
  customCss?: string
}

export type ButtonConfiguration = {
  /**
   * The icon to display on the button. Must be a valid Material Icon code as it
   * appears here: https://fonts.google.com/icons
   */
  icon?: string
  /** The text to display on the button. */
  label?: string
}

export type FormsAppEnvironmentStyles = BaseFormsAppEnvironmentStyles & {
  /** The absolute URL to the logo image displayed in Forms Apps */
  logoUrl?: string
  /** Configuration object for button customization */
  buttons?: {
    /** Button configuration for the Submit button */
    submit?: ButtonConfiguration
    /** Button configuration for the Cancel button */
    cancel?: ButtonConfiguration
    /** Button configuration for the Save Draft button */
    saveDraft?: ButtonConfiguration
    /** Button configuration for the Cancel Prompt dialog Yes button */
    cancelPromptYes?: ButtonConfiguration
    /** Button configuration for the Cancel Prompt dialog No button */
    cancelPromptNo?: ButtonConfiguration
  }
}

export type FormsAppEnvironmentSendingAddress = {
  emailAddress: string
  emailName?: string
  formsAppEnvironmentId: number
  createdAt: string
  updatedAt: string
}

export interface BaseFormsAppEnvironment {
  name: string
  description?: string
  organisationId: string
  slug: string
  notificationEmailAddresses: string[]
  styles?: FormsAppEnvironmentStyles
  sendingAddress?: FormsAppEnvironmentSendingAddress
}

export interface NewFormsAppEnvironment extends BaseFormsAppEnvironment {
  cloneOptions?: {
    sourceFormsAppEnvironmentId: number
    isCloningFormElementOptionsSets: boolean
    isCloningFormElementLookups: boolean
    isCloningFormSubmissionEvents: boolean
    isCloningFormApprovalSteps: boolean
    isCloningFormPostSubmissionActions: boolean
    isCloningFormServerValidation: boolean
    isCloningFormExternalIdGenerationOnSubmit: boolean
    isCloningFormPersonalisation: boolean
    isCloningFormTags: boolean
    isCloningFormSubmissionTitle: boolean
    isCloningFormPostSubmissionReceipt: boolean
    isCloningFormCustomCssClasses: boolean
    isCloningScheduledTasks: boolean
  }
}

export type FormsAppEnvironment = {
  id: number
  createdAt: Date
  updatedAt: Date
} & BaseFormsAppEnvironment

export interface FormMigrationOptions {
  formsAppEnvironmentId: number
  elements: boolean
  approvalSteps: boolean
  submissionEvents: boolean
  tags: boolean
  submissionTitle: boolean
  customCssClasses: boolean
  postSubmissionReceipt: boolean
  postSubmissionAction: boolean
  serverValidation: boolean
  externalIdGenerationOnSubmit: boolean
  personalisation: boolean
  embeddedForms?: Array<{
    sourceElementId: string
    targetFormId: number
  }>
  approvalForms?: Array<{
    stepLabel: string
    targetFormId: number
  }>
  versionId?: number
}

export type FormMigrationData = {
  sourceFormId: number
  targetFormId?: number
} & FormMigrationOptions
