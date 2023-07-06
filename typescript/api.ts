import { S3ObjectCredentials } from './aws'

export type APIEnvironmentRoute = {
  module: string
  route: string
}

export type APIDeploymentPayloadScheduledFunction = {
  /** A unique identifier for the function within the scope of the Hosted API */
  name: string
  /** A human readable label for the function to display */
  label: string
  /** The relative path to the file to execute the function */
  module: string
  /** The name of the exported function in the "module" to execute the function */
  export: string
  /** The relative path including the function name to the file to execute the function */
  handler: string
  /** The time in seconds allowed for the function to finish executing */
  timeout: number
  /** If set to true the function will automatically retry if the function fails */
  retryOnFail: boolean
}

export type APIEnvironmentSchedule = {
  /** The days the schedule should be triggered */
  days: Array<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'>
  /**
   * The UTC timezone hour the schedule should be triggered in 24 hour time.
   * I.e. must be between 0 and 23.
   */
  hour: number
  /** The minute the schedule should be triggered. I.e. must be between 0 and 59. */
  minute: number
  /** `true` if the schedule is currently disabled */
  isDisabled: boolean
  /** A list of email addresses to send a failure email if the scheduled function fails */
  failureEmailAddresses: string[]
}

export type APIEnvironmentScheduledFunction = APIDeploymentPayloadScheduledFunction & {
  /** AWS configuration */
  aws: {
    /** AWS Lambda configuration */
    lambda: {
      /** The Lambda function ARN to allow linking between EventBridge and Lambda */
      functionArn: string
    }
    /** AWS EventBridge configuration */
    eventBridge: {
      /** The name identifier for the AWS EventBridge rule */
      name: string
    }
  }
  /** The schedule configuration in a structure format parsed from a cron expression */
  schedule?: APIEnvironmentSchedule
}

export type APIEnvironment = {
  apiId: string
  environment: string
  lastDeployment: string
  routes: APIEnvironmentRoute[]
  scheduledFunctions?: APIEnvironmentScheduledFunction[]
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
  routes: APIEnvironmentRoute[]
  network: APIEnvironmentNetworkConfiguration | null | undefined
  memorySize?: number
  scheduledFunctions?: APIDeploymentPayloadScheduledFunction[]
}

export type APIEnvironmentMetricsSearchParameters = {
  startTime: string
  endTime: string
  period: number
}
