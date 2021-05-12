export type IntegrationType =
  | 'CP_PAY'
  | 'TRIM'
  | 'CP_HCMS'
  | 'BPOINT'
  | 'GEOSCAPE'
  | 'POINT'
  | 'RECAPTCHA'

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

export type IntegrationRecaptcha = IntegrationBase & {
  type: 'RECAPTCHA'
  configuration: {
    domains: IntegrationRecaptchaDomain[]
  }
}

export interface IntegrationRecaptchaDomain {
  id: string
  domain: string
  privateKey: string
  publicKey: string
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
export type IntegrationGeoscape = IntegrationBase & {
  type: 'GEOSCAPE'
  configuration: {
    apiKey: string
  }
}

export type IntegrationPoint = IntegrationBase & {
  type: 'POINT'
  configuration: {
    apiKey: string
  }
}

export type Integration =
  | IntegrationTrim
  | IntegrationCPPay
  | IntegrationCPHCMS
  | IntegrationBPOINT
  | IntegrationGeoscape
  | IntegrationPoint
  | IntegrationRecaptcha
