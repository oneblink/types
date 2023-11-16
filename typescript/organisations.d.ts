import { FormEventType } from './submissionEvents'
import { FormPostSubmissionAction } from './forms'
import { UserProfile } from './misc'

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
    availableFormSubmissionEvents?: FormEventType[] | null
    availableFormPostSubmissionActions?: FormPostSubmissionAction[] | null
    allowFormsAppPWASettings: boolean
    allowFormsAppCustomDomains: boolean
    allowFormsAppMenu: boolean
    allowApprovalsSolution?: boolean
    allowVolunteersSolution?: boolean
    allowSubmissionTitleSearch?: boolean
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
  | 'SchedulingBooking'
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

export type NewAuditRecord = {
  type: AuditRecordType
  recordId: Record<string, unknown>
  recordLabel?: string
  operation: 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE' | 'SEARCH'
  organisationId: string
  user?: UserProfile
  key?: {
    id: string
    name: string
  }
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
