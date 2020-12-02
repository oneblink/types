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
    [key: string]: string,
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

declare type OneBlinkAPIHostingRequest<T = void> = {
  body: T,
  headers: {
    [id: string]: string | boolean,
  },
  method: string,
  route: string,
  url: {
    host: string,
    hostname: string,
    params: { [id: string]: string },
    pathname: string,
    protocol: 'http:' | 'https:',
    query: { [id: string]: string },
  },
}

declare interface OneBlinkAPIHostingResponse<T = void> {
  +headers: $PropertyType<OneBlinkAPIHostingRequest<void>, 'headers'>;
  +payload: T;
  +statusCode: number;
  setHeader(key: string, value: string): OneBlinkAPIHostingResponse<T>;
  setPayload(payload: T): OneBlinkAPIHostingResponse<T>;
  setStatusCode(code: number): OneBlinkAPIHostingResponse<T>;
}

declare type OneBlinkAPIHostingHandler<In = void, Out = void> = (
  OneBlinkAPIHostingRequest<In>,
  OneBlinkAPIHostingResponse<Out>
) =>
  | Promise<OneBlinkAPIHostingResponse<Out> | Out | number | void>
  | OneBlinkAPIHostingResponse<Out>
  | Out
  | number
  | void
