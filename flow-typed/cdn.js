// @flow

declare type WebApp = {
  id: string,
  createdAt: string,
  links: {
    awsAccounts: string,
    organisations: string,
  },
}

declare type webAppEnvironment = {
  webAppId: string,
  environment: string,
  lastDeployment: string,
  distributionConfiguration: {
    distributionId: string,
    domainName: string,
    brandedDomain: string,
  },
}
