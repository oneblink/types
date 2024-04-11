export type IntegrationType =
  | 'CP_PAY'
  | 'TRIM'
  | 'CIVICA'
  | 'CP_HCMS'
  | 'BPOINT'
  | 'GEOSCAPE'
  | 'POINT'
  | 'RECAPTCHA'
  | 'WESTPAC_QUICK_WEB'
  | 'WESTPAC_QUICK_STREAM'
  | 'SCHEDULING'
  | 'FRESHDESK'
  | 'MAILGUN'
  | 'NSW_GOV_PAY'
  | 'API_NSW'
  | 'GOOGLE_MAPS'

type IntegrationBase = {
  organisationId: string
  updatedAt: Date
  createdAt: Date
}

export type IntegrationTrimEnvironment = {
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

export type IntegrationCivicaEnvironment = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: string
}
export type IntegrationCivica = IntegrationBase & {
  type: 'CIVICA'
  configuration: {
    environments: Array<IntegrationCivicaEnvironment>
  }
}

export type IntegrationCPPayGateway = {
  id: string
  label: string
  clientId: string
  clientSecret: string
  paymentType?: number
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

export type IntegrationRecaptchaDomain = {
  id: string
  label: string
  privateKey: string
  publicKey: string
}
export type IntegrationBPOINTEnvironment = {
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
export type IntegrationNSWGovPayPrimaryAgency = {
  /** Identifier used to link to a form payment event */
  id: string
  /** Displayed to team members when configuring form payment events */
  label: string
  /** The unique identifier that NSW GovPay need to validate primary agency details */
  callingSystem: string
  /** The client identifier used for Auth2.0 authentication */
  clientId: string
  /** The client secret used for Auth2.0 authentication */
  clientSecret: string
  /** The public key used to verify JSON web token to validate a payment */
  jwtPublicKey: string
  /**
   * Optional codes that will ensure the payment goes to the correct agency
   * within NSW GovPay
   */
  subAgencyCodes?: string[]
  /**
   * Set to `true` to use the non-prod version by changing the domain used for
   * all requests to NSW GovPay.
   */
  isNonProd: boolean
}
export type IntegrationNSWGovPay = IntegrationBase & {
  type: 'NSW_GOV_PAY'
  /** Integration configuration */
  configuration: {
    /** The primary agencies configured in NSW GovPay */
    primaryAgencies: IntegrationNSWGovPayPrimaryAgency[]
  }
}

export type IntegrationWestpacQuickWebEnvironment = {
  id: string
  label: string
  username: string
  password: string
  supplierBusinessCode: string
  communityCode: string
  isTestMode: boolean
}
export type IntegrationWestpacQuickWeb = IntegrationBase & {
  type: 'WESTPAC_QUICK_WEB'
  configuration: {
    environments: IntegrationWestpacQuickWebEnvironment[]
  }
}

export type IntegrationWestpacQuickStreamEnvironment = {
  id: string
  label: string
  publishableApiKey: string
  secretApiKey: string
  supplierBusinessCode: string
  isTestMode: boolean
}
export type IntegrationWestpacQuickStream = IntegrationBase & {
  type: 'WESTPAC_QUICK_STREAM'
  configuration: {
    environments: IntegrationWestpacQuickStreamEnvironment[]
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

export type IntegrationSchedulingProvider = {
  nylasAccountId: string
  nylasAccountAccessToken: string
}

export type IntegrationScheduling = IntegrationBase & {
  type: 'SCHEDULING'
  configuration: {
    providers: IntegrationSchedulingProvider[]
  }
}

export type IntegrationFreshdesk = IntegrationBase & {
  type: 'FRESHDESK'
  configuration: {
    baseUrl: string
    apiKey: string
  }
}

export type IntegrationMailGun = IntegrationBase & {
  type: 'MAILGUN'
  configuration: {
    domain: string
    apiKey: string
    userVariables?: Array<
      {
        key: string
      } & (
        | {
            type: 'TEXT'
            text: string
          }
        | {
            type:
              | 'ENVIRONMENT_NAME'
              | 'FORM_DESCRIPTION'
              | 'FORM_ID'
              | 'SUBMISSION_ID'
              | 'EXTERNAL_ID'
          }
      )
    >
  }
}

export type IntegrationAPINSW = IntegrationBase & {
  type: 'API_NSW'
  configuration: {
    products: {
      liquor?: { apiKey: string; apiSecret: string }
    }
  }
}

export type IntegrationGoogleMaps = IntegrationBase & {
  type: 'GOOGLE_MAPS'
  configuration: {
    apiKey: string
  }
}

export type DeleteIntegrationValidationResults = {
  forms: Array<{ formId: number; formName: string }>
  formsApps: Array<{ formsAppId: number; formsAppName: string }>
}

export type Integration =
  | IntegrationTrim
  | IntegrationCPPay
  | IntegrationCPHCMS
  | IntegrationBPOINT
  | IntegrationGeoscape
  | IntegrationPoint
  | IntegrationRecaptcha
  | IntegrationWestpacQuickWeb
  | IntegrationWestpacQuickStream
  | IntegrationCivica
  | IntegrationScheduling
  | IntegrationFreshdesk
  | IntegrationMailGun
  | IntegrationNSWGovPay
  | IntegrationAPINSW
  | IntegrationGoogleMaps
