import { S3ObjectCredentials } from './aws'

export type APIEnvironmentRoute = {
  module: string
  route: string
}

export type APIDeploymentPayloadScheduledFunction = {
  name: string
  label: string
  module: string
}

export type APIEnvironmentSchedule = {
  /** The days the schedule should be triggered */
  days: Array<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'>
  /**
   * The time the schedule should be triggered in 24 hour time in the following
   * format: "03:00" or "15:30"
   */
  time: string
}

export type APIEnvironmentScheduledFunction =
  APIDeploymentPayloadScheduledFunction & {
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
        /** `true` if the schedule is currently disabled */
        isDisabled?: boolean
        /**
         * AWS EventBridge cron expression:
         * https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html
         */
        scheduleExpression?: string
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
