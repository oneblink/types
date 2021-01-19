export interface WebApp {
  id: string
  isCorsEnabled: boolean
  createdAt: string
  links: {
    awsAccounts: string
    organisations: string
  }
}

export interface webAppEnvironment {
  webAppId: string
  environment: string
  lastDeployment: string
  distributionConfiguration: {
    distributionId: string
    domainName: string
    brandedDomain: string
  }
}
