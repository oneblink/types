// @flow

declare type WebApp = {
  id: string,
  isCorsEnabled: boolean,
  createdAt: string,
  environments?: WebAppEnvironment[],
  links: {
    awsAccounts: string,
    organisations: string,
  },
}

declare type WebAppEnvironment = {
  webAppId: string,
  environment: string,
  lastDeployment: string,
  distributionConfiguration: {
    distributionId: string,
    domainName: string,
    brandedDomain: string,
  },
}
