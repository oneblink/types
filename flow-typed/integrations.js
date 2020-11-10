// @flow

declare type IntegrationType = 'CP_PAY' | 'TRIM' | 'CP_HCMS' | 'BPOINT'

type IntegrationBase = {
  organisationId: string,
  updatedAt: Date,
  createdAt: Date,
}

declare type IntegrationTrimEnvironment = {
  id: string,
  label: string,
  baseUrl: string,
  username: string,
  password: string,
}
declare type IntegrationTrim = IntegrationBase & {
  type: 'TRIM',
  configuration: {
    environments: Array<IntegrationTrimEnvironment>,
  },
}

declare type IntegrationCPPayGateway = {
  id: string,
  label: string,
  clientId: string,
  clientSecret: string,
}

declare type IntegrationCPPay = IntegrationBase & {
  type: 'CP_PAY',
  configuration: {
    baseUrl: string,
    gateways: IntegrationCPPayGateway[],
  },
}

declare type IntegrationCPHCMS = IntegrationBase & {
  type: 'CP_HCMS',
  configuration: {
    baseUrl: string,
    clientId: string,
    clientSecret: string,
  },
}

declare type IntegrationBPOINTEnvironment = {
  id: string,
  label: string,
  baseUrl: string,
  username: string,
  password: string,
  merchantNumber: string,
  shortMerchantName: string,
  billerCode?: string,
  isTestMode?: boolean,
}
declare type IntegrationBPOINT = IntegrationBase & {
  type: 'BPOINT',
  configuration: {
    environments: IntegrationBPOINTEnvironment[],
  },
}

declare type Integration =
  | IntegrationTrim
  | IntegrationCPPay
  | IntegrationCPHCMS
  | IntegrationBPOINT