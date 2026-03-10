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
  externalId?: string
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

export interface TierDataMaximumContraints {
  maximumWorkspaces?: TierLimitation
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
}
export interface NewTier {
  name: string
  tierData: TierDataMaximumContraints & {
    availableFormSubmissionEvents?: FormEventType[] | null
    availableFormPostSubmissionActions?: FormPostSubmissionAction[] | null
    availableIntegrations?: IntegrationType[] | null
    allowFormsAppPWASettings: boolean
    allowFormsAppCustomDomains: boolean
    allowFormsAppMenu: boolean
    allowApprovalsSolution?: boolean
    allowSubmissionTitleSearch?: boolean
    allowCivicPlusForethoughtChatbot?: boolean
    allowSAMLUserAuthentication: boolean
    allowAIFormBuilder?: boolean
    allowPDFConversion?: boolean
  }
  isTrialTier: boolean
  awsDimensionAPIName?: string
}

export type Tier = NewTier & {
  id: number
  createdAt: string
  updatedAt: string
}

type AuditRecordTypeExcludingWorkspace =
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
  | 'WebApp'
  | 'WebAppEnvironment'
  | 'WebAppEnvironmentCustomDomain'
  | 'WebAppEnvironmentCustomDomainCertificate'
  | 'Role'
  | 'TeamMember'
  | 'Integration'
  | 'Audit'
  | 'AccountAsset'
  | 'ScheduledTask'
  | 'CompletedTask'
  | 'ScheduledTaskAction'
  | 'ScheduledTaskGroup'
  | 'ScheduledTaskGroupInstance'
  | 'OrganisationManagedSecret'
  | 'FeatureFlag'
  | 'EmailAttachment'
  | 'EmailTemplate'
  | 'FormSubmissionStatistics'
  | 'WebhookSubscription'
  | 'FormsAppUser'
  | 'FormsAppEnvironmentReordering'

export type AuditRecordTypeIncludingWorkspace =
  | 'FormsAppEnvironment'
  | 'FormsAppEnvironmentApproverGroup'
  | 'Form'
  | 'FormJsonSchema'
  | 'FormsApp'
  | 'FormsAppStyles'
  | 'FormsAppKey'
  | 'FormsAppRequestAccess'
  | 'FormsAppHostnameConfiguration'
  | 'FormsAppHostnameConfigurationCertificate'
  | 'FormSubmissionUrl'
  | 'FormSubmissionExtract'
  | 'FormWorkflowEventReplay'
  | 'FormsAppDraft'
  | 'FormsAppUserSubscription'
  | 'FormsAppSendingAddress'
  | 'FormsAppSendingAddressResend'
  | 'SchedulingBooking'
  | 'SchedulingBookingSession'
  | 'FormSubmissionPayment'
  | 'FormSubmissionAttachment'
  | 'FormSubmissionAttachmentUrl'
  | 'FormsAppSamlIdentityProvider'
  | 'FormStore'
  | 'FormStoreExport'
  | 'FormStoreFormDefinition'
  | 'FormApprovalWebhookEventReplay'
  | 'FormVersion'
  | 'FormSubmissionDraft'
  | 'PDFConversion'
  | 'FormKeyAssociation'
  | 'FormsAppMfaRequirement'
  | 'FormsAppEnvironmentSendingAddress'
  | 'FormsAppEnvironmentSendingAddressResend'
  | 'FormsAppEnvironmentHostnameConfiguration'
  | 'FormsAppEnvironmentHostnameConfigurationCertificate'
  | 'FormSubmissionApproval'
  | 'FormSubmissionApprovalAdditionalNote'
  | 'FormApprovalFlowInstance'
  | 'FormSubmission'
  | 'FormSubmissionMeta'

export type AuditRecordTypeOptionalWorkspace =
  | 'Job'
  | 'FormElementLookup'
  | 'FormElementDynamicOptionSet'
  | 'FormRetentionPolicy'
  | 'FormApprovalWebhook'
  | 'Workspace'

export type AuditRecordType =
  | AuditRecordTypeExcludingWorkspace
  | AuditRecordTypeIncludingWorkspace
  | AuditRecordTypeOptionalWorkspace

type NewAuditRecordBase = {
  recordId: Record<string, unknown>
  recordLabel?: string
  operation: 'VIEW' | 'CREATE' | 'UPDATE' | 'DELETE' | 'SEARCH'
  organisationId: string
  user?: UserProfile
  key?: DeveloperKeyReference
  clientIpAddress?: string
}

export type NewAuditRecord =
  | (NewAuditRecordBase & {
      type: AuditRecordTypeExcludingWorkspace
    })
  | (NewAuditRecordBase & {
      type: AuditRecordTypeIncludingWorkspace
      workspaceId: number
    })
  | (NewAuditRecordBase & {
      type: AuditRecordTypeOptionalWorkspace
      workspaceId?: number
    })

export type AuditRecord = Omit<NewAuditRecord, 'workspaceId'> & {
  id: number
  createdAt: string
  workspaceId?: number
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

export type FeatureFlag = {
  organisationId: string
  type: 'AI_FORMS_BUILDER'
  allowedFormsAppEnvironmentIds: number[]
}
