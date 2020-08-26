// @flow

declare type APIEnvironmentRoute = {
  module: string,
  route: string,
}

declare type APIEnvironment = {
  apiId: string,
  environment: string,
  lastDeployment: string,
  routes: APIEnvironmentRoute[],
  cors: Object | boolean,
  vpcSecurityGroupIds?: string,
  vpcSubnetIds?: string,
  status?: 'Warning' | 'Error' | 'Okay' | 'Unknown',
}

declare type API = {
  id: string,
  createdAt: string,
  vpcSecurityGroupIds?: string,
  vpcSubnetIds?: string,
  links: {
    awsAccounts: string,
    organisations: string,
  },
  executionIamRole: string,
  environments?: APIEnvironment[],
  whiteListedEmails?: string[],
}

declare type APIDeploymentPayload = {
  scope: string,
  env: string,
  s3: {
    region: string,
    key: string,
    bucket: string,
  },
  analytics?: {
    key?: string,
    secret?: string,
    origin?: string,
  },
  timeout: number,
  cors:
    | boolean
    | {
        maxAge?: number,
        credentials?: boolean,
        headers?: string[],
        exposedHeaders?: string[],
        origins?: string[],
      },
  runtime: string,
  handler: string,
  variables: {
    [string: key]: string,
  },
  routes: Array<{
    module: string,
    route: string,
  }>,
  network: ?{
    vpcSubnets: string[],
    vpcSecurityGroups: string[],
  },
  memorySize?: number,
}

declare type APIDeploymentResult = {
  awsBaseUrl: string,
  baseUrl: string,
}

declare type APIDeployment = {
  id: number,
  createdAt: string,
  lastUpdated: string,
  error?: {
    error: string,
    message: string,
  },
  result?: APIDeploymentResult,
}

declare type APIEnvironmentMetricsSearchParameters = {
  startTime: string,
  endTime: string,
  period: number,
}
