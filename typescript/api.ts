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
}

export type APIEnvironmentMetricsSearchParameters = {
  startTime: string
  endTime: string
  period: number
}

export type OneBlinkAPIHostingRequest<T = void> = {
  body: T
  headers: {
    [id: string]: string | boolean
  }
  method: string
  route: string
  url: {
    host: string
    hostname: string
    params: { [id: string]: string }
    pathname: string
    protocol: 'http:' | 'https:'
    query: { [id: string]: string }
  }
}

export interface OneBlinkAPIHostingResponse<T = void> {
  readonly headers: OneBlinkAPIHostingRequest['headers']
  readonly payload: T
  readonly statusCode: number
  setHeader(key: string, value: string): OneBlinkAPIHostingResponse<T>
  setPayload(payload: T): OneBlinkAPIHostingResponse<T>
  setStatusCode(code: number): OneBlinkAPIHostingResponse<T>
}

export type OneBlinkAPIHostingHandler<In = void, Out = void> = (
  req: OneBlinkAPIHostingRequest<In>,
  res: OneBlinkAPIHostingResponse<Out>
) =>
  | Promise<OneBlinkAPIHostingResponse<Out> | Out | number | void>
  | OneBlinkAPIHostingResponse<Out>
  | Out
  | number
  | void
