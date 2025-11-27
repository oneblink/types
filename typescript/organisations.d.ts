import { FormEventType } from './submissionEvents'
import { FormPostSubmissionAction } from './forms'
import { UserProfile } from './misc'
import { DeveloperKeyReference } from './keys'
import { IntegrationType } from './integrations'

export interface NewFormRetentionPolicy {
  formId: number
  submissionDataRetentionDays?: number
}

export type FormRetentionPolicy = NewFormRetentionPolicy & {
  createdAt: string
  updatedAt: string
}

export type NewOrganisation = {
  name: string
  assetsS3Bucket: string
  slug: string
  tierId: number
  trialExpiry?: string | null
  tags?: string[] | null
  retainSubmissionData: boolean
  submissionDataRetentionDays?: number | null
  retainPrefillData: boolean
  prefillDataRetentionDays?: number | null
  retainDraftData: boolean
  draftDataRetentionDays?: number | null
  awsCustomerId?: string
  apiHostingAwsAccountId: string
  cdnHostingAwsAccountId: string
  formStoreFormIds?: number[]
  tierOverrides?: Partial<NewTier['tierData']>
  attachmentLinkExpiryDaysOverride?: number
  timezone?: string
  requireTeamMemberMfa?: boolean
  environmentOrdering?: number[]
  formsBuilderAISystemConfigurationIdOverride?: number
}

export type Organisation = NewOrganisation & {
  id: string
  createdAt: string
}

export interface AWSAccount {
  id: string
  name: string
  accountNumber: string
  tenancy: string
  createdAt: string
  isDefault: boolean
  isDefaultAPIHosting: boolean
  isDefaultCDNHosting: boolean
}

export type TierLimitation =
  | {
      unlimited: true
    }
  | {
      limit: number
      unlimited: false
    }

export interface NewTier {
  name: string
  tierData: {
    maximumForms?: TierLimitation
    maximumFormSubmissions: TierLimitation
    maximumAuthenticatedFormSubmissions: TierLimitation
    maximumConsoleUsers: TierLimitation
    maximumAppUsers: TierLimitation
    maximumFormAppsEnvironments: TierLimitation
    maximumFormElementLookups: TierLimitation
    maximumFormElementOptionsSets: TierLimitation
    maximumDeveloperKeys: TierLimitation
    maximumAPIHostingInstances: TierLimitation
    maximumCDNHostingInstances: TierLimitation
    maximumFormsApps: TierLimitation
    maximumSchedulingCalendars: TierLimitation
    maximumFormStoreForms: TierLimitation
    maximumFormStoreAppUsers: TierLimitation
    maximumScheduledFunctions: TierLimitation
    maximumScheduledTaskCompletions: TierLimitation
    maximumFormSequentialNumberReceiptComponents: TierLimitation
    maximumFormCustomPDFs: TierLimitation
    maximumEmailTemplates: TierLimitation
    availableFormSubmissionEvents?: FormEventType[] | null
    availableFormPostSubmissionActions?: FormPostSubmissionAction[] | null
    availableIntegrations?: IntegrationType[] | null
    allowFormsAppPWASettings: boolean
    allowFormsAppCustomDomains: boolean
    allowFormsAppMenu: boolean
    allowApprovalsSolution?: boolean
    allowVolunteersSolution?: boolean
    allowSubmissionTitleSearch?: boolean
    allowCivicPlusForethoughtChatbot?: boolean
    allowSAMLUserAuthentication: boolean
    allowAIFormBuilder?: boolean
  }
  isTrialTier: boolean
  awsDimensionAPIName?: string
}

export type Tier = NewTier & {
  id: number
  createdAt: string
  updatedAt: string
}

export type AuditRecordType =
  | 'Organisation'
  | 'OrganisationDeleteRequest'
  | 'OrganisationDataRetention'
  | 'OrganisationMfaRequirement'
  | 'EnableAwsBilling'
  | 'ExtendTrial'
  | 'Key'
  | 'API'
  | 'APIEnvironment'
  | 'APIEnvironmentLogs'
  | 'APIEnvironmentMetrics'
  | 'APIEnvironmentServe'
  | 'APIEnvironmentSchedule'
  | 'APIEnvironmentScheduleInvocation'
  | 'FormsAppEnvironment'
  | 'FormsAppEnvironmentApproverGroup'
  | 'FormElementDynamicOptionSet'
  | 'FormElementLookup'
  | 'Form'
  | 'FormJsonSchema'
  | 'WebApp'
  | 'WebAppEnvironment'
  | 'WebAppEnvironmentCustomDomain'
  | 'WebAppEnvironmentCustomDomainCertificate'
  | 'FormsApp'
  | 'FormsAppStyles'
  | 'FormsAppUser'
  | 'FormsAppKey'
  | 'FormsAppRequestAccess'
  | 'FormsAppHostnameConfiguration'
  | 'FormsAppHostnameConfigurationCertificate'
  | 'Job'
  | 'FormSubmissionMeta'
  | 'FormSubmission'
  | 'FormSubmissionUrl'
  | 'FormSubmissionExtract'
  | 'FormSubmissionStatistics'
  | 'FormWorkflowEventReplay'
  | 'WebhookSubscription'
  | 'Role'
  | 'TeamMember'
  | 'FormsAppDraft'
  | 'FormsAppUserSubscription'
  | 'FormsAppSendingAddress'
  | 'FormsAppSendingAddressResend'
  | 'Integration'
  | 'FormApprovalFlowInstance'
  | 'FormSubmissionApproval'
  | 'FormApprovalWebhook'
  | 'FormRetentionPolicy'
  | 'EmailTemplate'
  | 'EmailAttachment'
  | 'SchedulingBooking'
  | 'SchedulingBookingSession'
  | 'FormSubmissionPayment'
  | 'FormSubmissionAttachment'
  | 'FormSubmissionAttachmentUrl'
  | 'Audit'
  | 'AccountAsset'
  | 'FormsAppSamlIdentityProvider'
  | 'FormStore'
  | 'FormStoreExport'
  | 'FormStoreFormDefinition'
  | 'FormSubmissionApprovalAdditionalNote'
  | 'FormApprovalWebhookEventReplay'
  | 'ScheduledTask'
  | 'CompletedTask'
  | 'ScheduledTaskAction'
  | 'ScheduledTaskGroup'
  | 'ScheduledTaskGroupInstance'
  | 'FormVersion'
  | 'FormSubmissionDraft'
  | 'PDFConversion'
  | 'OrganisationManagedSecret'
  | 'FormKeyAssociation'
  | 'FormsAppMfaRequirement'
  | 'FormsAppEnvironmentSendingAddress'
  | 'FormsAppEnvironmentSendingAddressResend'
  | 'FormsAppEnvironmentHostnameConfiguration'
  | 'FormsAppEnvironmentHostnameConfigurationCertificate'
  | 'FormsAppEnvironmentReordering'
  | 'AIFormsBuilderDisclaimerConsent'

export type NewAuditRecord = {
  type: AuditRecordType
  recordId: Record<string, unknown>
  recordLabel?: string
  operation: 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE' | 'SEARCH'
  organisationId: string
  user?: UserProfile
  key?: DeveloperKeyReference
  clientIpAddress?: string
}

export type AuditRecord = NewAuditRecord & {
  id: number
  createdAt: string
}

export type NewProductNotification = {
  type: 'FEATURE' | 'BUG_FIX' | 'ANNOUNCEMENT'
  title: string
  body: string
  linkUrl?: string
  linkText?: string
  imageUrl: string
  imageAlt?: string
  publishedAt: string
  expiresAt: string
}

export type ProductNotification = NewProductNotification & {
  id: number
  createdAt: string
  updatedAt: string
}

export type DisclaimerConsent = {
  id: number
  organisationId: string
  type: 'AI_FORMS_BUILDER'
  allowedFormsAppEnvironmentIds: number[]
}
