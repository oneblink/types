// @flow

declare type FormRetentionPolicy = {
  formId: number,
  submissionDataRetentionDays?: number,
}

declare type Organisation = {
  id: string,
  name: string,
  assetsS3Bucket: string,
  slug: string,
  tierId: number,
  createdAt: Date,
  trialExpiry?: string,
  tags: string[],
  retainSubmissionData: boolean,
  submissionDataRetentionDays?: number,
  retainPrefillData: boolean,
  prefillDataRetentionDays?: number,
  retainDraftData: boolean,
  draftDataRetentionDays?: number,
  solutions: Array<$PropertyType<SolutionsApp, 'type'>>,
  awsCustomerId?: string,
  apiHostingAwsAccountId: string,
  cdnHostingAwsAccountId: string,
}

declare type AWSAccount = {
  id: string,
  name: string,
  accountNumber: string,
  tenancy: string,
  createdAt: string,
  isDefault: boolean,
  isDefaultAPIHosting: boolean,
  isDefaultCDNHosting: boolean,
}

declare type TierLimitation =
  | {
      unlimited: true,
    }
  | {
      limit: number,
      unlimited: false,
    }

declare type NewTier = {
  name: string,
  tierData: {
    maximumFormSubmissions: TierLimitation,
    maximumAuthenticatedFormSubmissions: TierLimitation,
    maximumConsoleUsers: TierLimitation,
    maximumAppUsers: TierLimitation,
    maximumFormAppsEnvironments: TierLimitation,
    maximumFormElementLookups: TierLimitation,
    maximumFormElementOptionsSets: TierLimitation,
    maximumDeveloperKeys: TierLimitation,
    maximumAPIHostingInstances: TierLimitation,
    maximumCDNHostingInstances: TierLimitation,
    maximumFormsApps: TierLimitation,
    maximumSchedulingCalendars: TierLimitation,
    availableFormSubmissionEvents?: FormSubmissionEventType[],
    availableFormPostSubmissionActions?: FormPostSubmissionAction[],
    allowFormsAppPWASettings: boolean,
    allowFormsAppCustomDomains: boolean,
    allowFormsAppMenu: boolean,
  },
  isTrialTier: boolean,
  isAWSFirst: boolean,
}

declare type Tier = NewTier & {
  id: number,
  createdAt: string,
  updatedAt: string,
}
