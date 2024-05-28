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

export type SavedSecret = {
  secretPointer: number
}
export type RawSecret = string

type Secret<T> = T extends SavedSecret | RawSecret ? T : RawSecret

export type IntegrationTrimEnvironment<S = RawSecret> = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: Secret<S>
}

export type IntegrationTrim<S = RawSecret> = IntegrationBase & {
  type: 'TRIM'
  configuration: {
    environments: Array<IntegrationTrimEnvironment<S>>
  }
}

export type IntegrationCivicaEnvironment<S = RawSecret> = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: Secret<S>
}
export type IntegrationCivica<S = RawSecret> = IntegrationBase & {
  type: 'CIVICA'
  configuration: {
    environments: Array<IntegrationCivicaEnvironment<S>>
  }
}

export type IntegrationCPPayGateway<S = RawSecret> = {
  id: string
  label: string
  clientId: string
  clientSecret: Secret<S>
  paymentType?: number
}

export type IntegrationCPPay<S = RawSecret> = IntegrationBase & {
  type: 'CP_PAY'
  configuration: {
    baseUrl: string
    gateways: IntegrationCPPayGateway<S>[]
  }
}

export type IntegrationCPHCMS<S = RawSecret> = IntegrationBase & {
  type: 'CP_HCMS'
  configuration: {
    baseUrl: string
    clientId: string
    clientSecret: Secret<S>
  }
}

export type IntegrationRecaptcha<S = RawSecret> = IntegrationBase & {
  type: 'RECAPTCHA'
  configuration: {
    domains: IntegrationRecaptchaDomain<S>[]
  }
}

export type IntegrationRecaptchaDomain<S = RawSecret> = {
  id: string
  label: string
  privateKey: Secret<S>
  publicKey: string
}
export type IntegrationBPOINTEnvironment<S = RawSecret> = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: Secret<S>
  merchantNumber: string
  shortMerchantName: string
  billerCode?: string
  isTestMode?: boolean
}
export type IntegrationBPOINT<S = RawSecret> = IntegrationBase & {
  type: 'BPOINT'
  configuration: {
    environments: IntegrationBPOINTEnvironment<S>[]
  }
}
export type IntegrationNSWGovPayPrimaryAgency<S = RawSecret> = {
  /** Identifier used to link to a form payment event */
  id: string
  /** Displayed to team members when configuring form payment events */
  label: string
  /** The unique identifier that NSW GovPay need to validate primary agency details */
  callingSystem: string
  /** The client identifier used for Auth2.0 authentication */
  clientId: string
  /** The client secret used for Auth2.0 authentication */
  clientSecret: Secret<S>
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
export type IntegrationNSWGovPay<S = RawSecret> = IntegrationBase & {
  type: 'NSW_GOV_PAY'
  /** Integration configuration */
  configuration: {
    /** The primary agencies configured in NSW GovPay */
    primaryAgencies: IntegrationNSWGovPayPrimaryAgency<S>[]
  }
}

export type IntegrationWestpacQuickWebEnvironment<S = RawSecret> = {
  id: string
  label: string
  username: string
  password: Secret<S>
  supplierBusinessCode: string
  communityCode: string
  isTestMode: boolean
}
export type IntegrationWestpacQuickWeb<S = RawSecret> = IntegrationBase & {
  type: 'WESTPAC_QUICK_WEB'
  configuration: {
    environments: IntegrationWestpacQuickWebEnvironment<S>[]
  }
}

export type IntegrationWestpacQuickStreamEnvironment<S = RawSecret> = {
  id: string
  label: string
  publishableApiKey: string
  secretApiKey: Secret<S>
  supplierBusinessCode: string
  isTestMode: boolean
}
export type IntegrationWestpacQuickStream<S = RawSecret> = IntegrationBase & {
  type: 'WESTPAC_QUICK_STREAM'
  configuration: {
    environments: IntegrationWestpacQuickStreamEnvironment<S>[]
  }
}

export type IntegrationGeoscape<S = RawSecret> = IntegrationBase & {
  type: 'GEOSCAPE'
  configuration: {
    apiKey: Secret<S>
  }
}

export type IntegrationPoint<S = RawSecret> = IntegrationBase & {
  type: 'POINT'
  configuration: {
    apiKey: Secret<S>
  }
}

export type IntegrationSchedulingProvider<S = RawSecret> = {
  nylasAccountId: string
  nylasAccountAccessToken: Secret<S>
}

export type IntegrationScheduling<S = RawSecret> = IntegrationBase & {
  type: 'SCHEDULING'
  configuration: {
    providers: IntegrationSchedulingProvider<S>[]
  }
}

export type IntegrationFreshdesk<S = RawSecret> = IntegrationBase & {
  type: 'FRESHDESK'
  configuration: {
    baseUrl: string
    apiKey: Secret<S>
  }
}

export type IntegrationMailGun<S = RawSecret> = IntegrationBase & {
  type: 'MAILGUN'
  configuration: {
    domain: string
    apiKey: Secret<S>
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

export type IntegrationAPINSW<S = RawSecret> = IntegrationBase & {
  type: 'API_NSW'
  configuration: {
    products: {
      liquor?: { apiKey: string; apiSecret: Secret<S> }
    }
  }
}

export type IntegrationGoogleMapsKey<S = RawSecret> = {
  id: string
  type: 'SEARCH'
  label: string
  apiKey: Secret<S>
}

export type IntegrationGoogleMaps<S = RawSecret> = IntegrationBase & {
  type: 'GOOGLE_MAPS'
  configuration: {
    keys: IntegrationGoogleMapsKey<S>[]
  }
}

export type DeleteIntegrationValidationResults = {
  forms: Array<{ formId: number; formName: string }>
  formsApps: Array<{ formsAppId: number; formsAppName: string }>
}

export type Integration<S = RawSecret> =
  | IntegrationTrim<S>
  | IntegrationCPPay<S>
  | IntegrationCPHCMS<S>
  | IntegrationBPOINT<S>
  | IntegrationGeoscape<S>
  | IntegrationPoint<S>
  | IntegrationRecaptcha<S>
  | IntegrationWestpacQuickWeb<S>
  | IntegrationWestpacQuickStream<S>
  | IntegrationCivica<S>
  | IntegrationScheduling<S>
  | IntegrationFreshdesk<S>
  | IntegrationMailGun<S>
  | IntegrationNSWGovPay<S>
  | IntegrationAPINSW<S>
  | IntegrationGoogleMaps<S>
