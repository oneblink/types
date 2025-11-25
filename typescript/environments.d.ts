import { FormStyle } from './styling-engine'
import { BaseHostnameConfiguration } from './formsApps'
import { RecaptchaKeyType } from './integrations'
import {
  EmailSendingAddressBase,
  EmailSendingAddressResponseBase,
} from './misc'

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
  /** The absolute URL to the favicon image displayed in Forms Apps and any Appless Forms */
  faviconUrl?: string
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
  /** The icon to display on validation error messages */
  validationIcon?: {
    /**
     * Must be a valid Material Icon code as it appears here:
     * https://fonts.google.com/icons
     */
    icon: string
    /** The accessible label for the icon. This will be displayed to screen readers. */
    accessibleLabel?: string
  }
  formStyling?: FormStyle
}

export type FormsAppEnvironmentSendingAddress = EmailSendingAddressBase & {
  formsAppEnvironmentId: number
}

export type FormsAppEnvironmentSendingAddressResponse =
  EmailSendingAddressResponseBase & {
    formsAppEnvironmentSendingAddress?: FormsAppEnvironmentSendingAddress
  }

export interface BaseFormsAppEnvironment {
  /** Name of the Forms App Environment */
  name: string
  description?: string
  /** The exact organisation identifier the forms app environment is associated with */
  organisationId: string
  /** Unique domain safe text to identify the forms app environment */
  slug: string
  /**
   * Array of emails addresses to be notified when an error occurs in processing
   * submission events
   */
  notificationEmailAddresses: string[]
  /** Customise default styles and branding for apps and emails */
  styles?: FormsAppEnvironmentStyles
  /** The id of the recaptcha integration to be used */
  recaptchaIntegrationDomainId?: string
  /** The id of the Google Maps integration key to be used for Google Maps elements */
  googleMapsIntegrationKeyId?: string
  customHostname?: string
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
    isCloningFormCustomPDFs: boolean
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
  customPDFs: boolean
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

export type FormsAppEnvironmentConfigurationBase = {
  organisationId: string
  formsAppEnvironmentId: number
  isTrialExpired: boolean
  styles: FormsAppEnvironmentStyles
  environmentCustomCss: string | undefined
  locale: string
  tz: string
  abnLookupAuthenticationGuid?: string
  accountAttachmentRetentionInDays?: number
  formsAttachmentRetention?: Array<{
    formId: number
    days: number
  }>
}

export type FormsAppEnvironmentConfiguration =
  FormsAppEnvironmentConfigurationBase & {
    recaptchaPublicKey: string
    recaptchaKeyType: RecaptchaKeyType
    googleMapsApiKey: string
  }

export type FormsAppEnvironmentHostnameConfiguration = {
  formsAppEnvironmentId: number
} & BaseHostnameConfiguration
