import { FormSubmissionEventType } from './submissionEvents'
import { FormPostSubmissionAction } from './forms'
import { SolutionsApp } from './formsApps'

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
}

export interface AWSAccount {
  id: string
  name: string
  accountNumber: string
  tenancy: string
  createdAt: string
  apiHosting: {
    vpcSecurityGroupIds: string
    vpcSubnetIds: string
  }
  isDefault: boolean
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
    availableFormSubmissionEvents?: FormSubmissionEventType[]
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
