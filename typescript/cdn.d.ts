export interface WebApp {
  id: string
  isCorsEnabled: boolean
  createdAt: string
  environments?: WebAppEnvironment[]
  links: {
    awsAccounts: string
    organisations: string
  }
}

export type NewWebAppEnvironmentDistributionConfiguration = {
  brandedDomain: string
  isSinglePageApplication?: boolean
  customDomain?: {
    isComplete: boolean
    domain: string
    acm: {
      certificateArn: string
      dnsValidation: {
        name: string
        type: string
        value: string
      }
    }
  }
}

export type NewWebAppEnvironment = {
  webAppId: string
  environment: string
  distributionConfiguration: NewWebAppEnvironmentDistributionConfiguration
}

export type WebAppEnvironment = NewWebAppEnvironment & {
  lastDeployment: string
  distributionConfiguration: NewWebAppEnvironmentDistributionConfiguration & {
    distributionId: string
    domainName: string
  }
}
