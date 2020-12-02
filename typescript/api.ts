export type APIEnvironmentRoute = {
  module: string
  route: string
}

export type APIEnvironment = {
  apiId: string
  environment: string
  lastDeployment: string
  routes: APIEnvironmentRoute[]
  cors: Object | boolean
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

export type APIDeploymentPayload = {
  scope: string
  env: string
  s3: {
    region: string
    key: string
    bucket: string
  }
  analytics?: {
    key?: string
    secret?: string
    origin?: string
  }
  timeout: number
  cors:
    | boolean
    | {
        maxAge?: number
        credentials?: boolean
        headers?: string[]
        exposedHeaders?: string[]
        origins?: string[]
      }
  runtime: string
  handler: string
  variables: {
    [key: string]: string
  }
  routes: Array<{
    module: string
    route: string
  }>
  network:
    | {
        vpcSubnets: string[]
        vpcSecurityGroups: string[]
      }
    | null
    | undefined
  memorySize?: number
}

export type APIDeploymentResult = {
  awsBaseUrl: string
  baseUrl: string
}

export type APIDeployment = {
  id: number
  createdAt: string
  lastUpdated: string
  error?: {
    error: string
    message: string
  }
  result?: APIDeploymentResult
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