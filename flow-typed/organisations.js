// @flow

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
}

declare type AWSAccount = {
  id: string,
  name: string,
  accountNumber: string,
  tenancy: string,
  createdAt: string,
  apiHosting: {
    vpcSecurityGroupIds: string,
    vpcSubnetIds: string,
  },
  isDefault: boolean,
}

declare type TierLimitation =
  | {
      unlimited: true,
    }
  | {
      limit: number,
      unlimited: false,
    }

declare type Tier = {
  id?: number,
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
    availableFormSubmissionEvents?: FormSubmissionEventType[],
    availableFormPostSubmissionActions?: FormPostSubmissionAction[],
    allowFormsAppPWASettings: boolean,
    allowFormsAppCustomDomains: boolean,
    allowFormsAppMenu: boolean,
  },
  createdAt?: string,
  updatedAt?: string,
  isTrialTier: boolean,
  isAWSFirst: boolean,
}
