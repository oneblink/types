export type IntegrationType =
  | 'CP_PAY'
  | 'TRIM'
  | 'CP_HCMS'
  | 'BPOINT'
  | 'GEOSCOPE'

interface IntegrationBase {
  organisationId: string
  updatedAt: Date
  createdAt: Date
}

export interface IntegrationTrimEnvironment {
  id: string
  label: string
  baseUrl: string
  username: string
  password: string
}
export type IntegrationTrim = IntegrationBase & {
  type: 'TRIM'
  configuration: {
    environments: Array<IntegrationTrimEnvironment>
  }
}

export interface IntegrationCPPayGateway {
  id: string
  label: string
  clientId: string
  clientSecret: string
}

export type IntegrationCPPay = IntegrationBase & {
  type: 'CP_PAY'
  configuration: {
    baseUrl: string
    gateways: IntegrationCPPayGateway[]
  }
}

export type IntegrationCPHCMS = IntegrationBase & {
  type: 'CP_HCMS'
  configuration: {
    baseUrl: string
    clientId: string
    clientSecret: string
  }
}

export interface IntegrationBPOINTEnvironment {
  id: string
  label: string
  baseUrl: string
  username: string
  password: string
  merchantNumber: string
  shortMerchantName: string
  billerCode?: string
  isTestMode?: boolean
}
export type IntegrationBPOINT = IntegrationBase & {
  type: 'BPOINT'
  configuration: {
    environments: IntegrationBPOINTEnvironment[]
  }
}
export type IntegrationGeoscope = IntegrationBase & {
  type: 'GEOSCOPE'
  configuration: {
    apiKey: string
  }
}

export type Integration =
  | IntegrationTrim
  | IntegrationCPPay
  | IntegrationCPHCMS
  | IntegrationBPOINT
  | IntegrationGeoscope
