export interface NewCDN {
  id: string
  isCorsEnabled: boolean
  createdAt: string
  environments?: WebAppEnvironment[]
  links: {
    awsAccounts: string
    organisations: string
  }
}

export interface CDN extends NewCDN {
  aws: {
    cloudFrontOriginAccessControlId: string
  }
}

export type NewCDNEnvironmentDistributionConfiguration = {
  brandedDomain: string
  isSinglePageApplication?: boolean
  disableSecurityResponseHeaders?: boolean
  isWafEnabled?: boolean
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

export type NewCDNEnvironment = {
  webAppId: string
  environment: string
  distributionConfiguration: NewWebAppEnvironmentDistributionConfiguration
}

export type CDNEnvironment = NewCDNEnvironment & {
  lastDeployment: string
  distributionConfiguration: NewWebAppEnvironmentDistributionConfiguration & {
    distributionId: string
    domainName: string
  }
}

export type WebApp = CDN
export type NewWebAppEnvironmentDistributionConfiguration = NewCDNEnvironmentDistributionConfiguration
export type NewWebAppEnvironment = NewCDNEnvironment
export type WebAppEnvironment = CDNEnvironment
