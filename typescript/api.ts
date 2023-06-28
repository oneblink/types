import { S3ObjectCredentials } from './aws'

export type APIEnvironmentRoute = {
  module: string
  route: string
}

export type APIEnvironment = {
  apiId: string
  environment: string
  lastDeployment: string
  routes: APIEnvironmentRoute[]
  cors: APIEnvironmentCorsConfiguration | boolean
  vpcSecurityGroupIds?: string
  vpcSubnetIds?: string
  status?: 'Warning' | 'Error' | 'Okay' | 'Unknown'
}

export type API = {
  id: string
  createdAt: string
  vpcSecurityGroupIds?: string
  vpcSubnetIds?: string
  links: {
    awsAccounts: string
    organisations: string
  }
  executionIamRole: string
  environments?: APIEnvironment[]
  whiteListedEmails?: string[]
}

export type APIEnvironmentCorsConfiguration = {
  maxAge?: number
  credentials?: boolean
  headers?: string[]
  exposedHeaders?: string[]
  origins?: string[]
}

export type APIEnvironmentNetworkConfiguration = {
  vpcSubnets: string[]
  vpcSecurityGroups: string[]
}

export type APIDeploymentPayloadScheduledFunction = {
  name: string
  label: string
  module: string
}

export type APIDeploymentPayload = {
  scope: string
  env: string
  s3: S3ObjectCredentials['s3']
  timeout: number
  cors: boolean | APIEnvironmentCorsConfiguration
  runtime: string
  handler: string
  variables: {
    [key: string]: string
  }
  routes: Array<{
    module: string
    route: string
  }>
  network: APIEnvironmentNetworkConfiguration | null | undefined
  memorySize?: number
  scheduledFunctions?: APIDeploymentPayloadScheduledFunction[]
}

export type APIEnvironmentMetricsSearchParameters = {
  startTime: string
  endTime: string
  period: number
}
