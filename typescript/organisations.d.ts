import { FormEventType } from './submissionEvents'
import { FormPostSubmissionAction } from './forms'
import { SolutionsApp } from './formsApps'
import { UserProfile } from './misc'

export interface NewFormRetentionPolicy {
  formId: number
  submissionDataRetentionDays?: number
}

export type FormRetentionPolicy = NewFormRetentionPolicy & {
  createdAt: string
  updatedAt: string
}

export interface Organisation {
  id: string
  name: string
  assetsS3Bucket: string
  slug: string
  tierId: number
  createdAt: Date
  trialExpiry?: string
  tags: string[]
  retainSubmissionData: boolean
  submissionDataRetentionDays?: number
  retainPrefillData: boolean
  prefillDataRetentionDays?: number
  retainDraftData: boolean
  draftDataRetentionDays?: number
  solutions: Array<SolutionsApp['type']>
  awsCustomerId?: string
  apiHostingAwsAccountId: string
  cdnHostingAwsAccountId: string
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
    availableFormSubmissionEvents?: FormEventType[]
    availableFormPostSubmissionActions?: FormPostSubmissionAction[]
    allowFormsAppPWASettings: boolean
    allowFormsAppCustomDomains: boolean
    allowFormsAppMenu: boolean
  }
  isTrialTier: boolean
  isAWSFirst: boolean
}

export type Tier = NewTier & {
  id: number
  createdAt: string
  updatedAt: string
}

export type AuditRecordType =
  | 'Organisation'
  | 'Key'
  | 'API'
  | 'APIEnvironment'
  | 'FormsAppEnvironment'
  | 'FormElementDynamicOptionSet'
  | 'FormElementLookup'
  | 'Form'
  | 'WebApp'
  | 'WebAppEnvironment'
  | 'FormsApp'
  | 'FormsAppUser'
  | 'FormsAppHostnameConfiguration'
  | 'Job'
  | 'FormSubmissionMeta'
  | 'FormSubmission'
  | 'WebhookSubscription'
  | 'Role'
  | 'TeamMember'
  | 'FormsAppDraft'
  | 'FormsAppUserSubscription'
  | 'FormsAppSendingAddress'
  | 'Integration'
  | 'FormApprovalFlowInstance'
  | 'FormSubmissionApproval'
  | 'FormApprovalWebhook'
  | 'FormRetentionPolicy'
  | 'EmailTemplate'
  | 'SchedulingBooking'
  | 'FormSubmissionPayment'
  | 'FormSubmissionAttachment'

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
