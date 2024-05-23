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
  cipherText: string
  encryptionKeyId: string
}
export type NewSecret = string

export type Secret<T> = T extends SavedSecret | NewSecret ? T : SavedSecret

export type IntegrationTrimEnvironment<S = SavedSecret> = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: Secret<S>
}

export type IntegrationTrim<S = SavedSecret> = IntegrationBase & {
  type: 'TRIM'
  configuration: {
    environments: Array<IntegrationTrimEnvironment<S>>
  }
}

export type IntegrationCivicaEnvironment<S = SavedSecret> = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: Secret<S>
}
export type IntegrationCivica<S = SavedSecret> = IntegrationBase & {
  type: 'CIVICA'
  configuration: {
    environments: Array<IntegrationCivicaEnvironment<S>>
  }
}

export type IntegrationCPPayGateway<S = SavedSecret> = {
  id: string
  label: string
  clientId: string
  clientSecret: Secret<S>
  paymentType?: number
}

export type IntegrationCPPay<S = SavedSecret> = IntegrationBase & {
  type: 'CP_PAY'
  configuration: {
    baseUrl: string
    gateways: IntegrationCPPayGateway<S>[]
  }
}

export type IntegrationCPHCMS<S = SavedSecret> = IntegrationBase & {
  type: 'CP_HCMS'
  configuration: {
    baseUrl: string
    clientId: string
    clientSecret: Secret<S>
  }
}

export type IntegrationRecaptcha<S = SavedSecret> = IntegrationBase & {
  type: 'RECAPTCHA'
  configuration: {
    domains: IntegrationRecaptchaDomain<S>[]
  }
}

export type IntegrationRecaptchaDomain<S = SavedSecret> = {
  id: string
  label: string
  privateKey: Secret<S>
  publicKey: Secret<S>
}
export type IntegrationBPOINTEnvironment<S = SavedSecret> = {
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
export type IntegrationBPOINT<S = SavedSecret> = IntegrationBase & {
  type: 'BPOINT'
  configuration: {
    environments: IntegrationBPOINTEnvironment<S>[]
  }
}
export type IntegrationNSWGovPayPrimaryAgency<S = SavedSecret> = {
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
  jwtPublicKey: Secret<S>
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
export type IntegrationNSWGovPay<S = SavedSecret> = IntegrationBase & {
  type: 'NSW_GOV_PAY'
  /** Integration configuration */
  configuration: {
    /** The primary agencies configured in NSW GovPay */
    primaryAgencies: IntegrationNSWGovPayPrimaryAgency<S>[]
  }
}

export type IntegrationWestpacQuickWebEnvironment<S = SavedSecret> = {
  id: string
  label: string
  username: string
  password: Secret<S>
  supplierBusinessCode: string
  communityCode: string
  isTestMode: boolean
}
export type IntegrationWestpacQuickWeb<S = SavedSecret> = IntegrationBase & {
  type: 'WESTPAC_QUICK_WEB'
  configuration: {
    environments: IntegrationWestpacQuickWebEnvironment<S>[]
  }
}

export type IntegrationWestpacQuickStreamEnvironment<S = SavedSecret> = {
  id: string
  label: string
  publishableApiKey: Secret<S>
  secretApiKey: Secret<S>
  supplierBusinessCode: string
  isTestMode: boolean
}
export type IntegrationWestpacQuickStream<S = SavedSecret> = IntegrationBase & {
  type: 'WESTPAC_QUICK_STREAM'
  configuration: {
    environments: IntegrationWestpacQuickStreamEnvironment<S>[]
  }
}

export type IntegrationGeoscape<S = SavedSecret> = IntegrationBase & {
  type: 'GEOSCAPE'
  configuration: {
    apiKey: Secret<S>
  }
}

export type IntegrationPoint<S = SavedSecret> = IntegrationBase & {
  type: 'POINT'
  configuration: {
    apiKey: Secret<S>
  }
}

export type IntegrationSchedulingProvider<S = SavedSecret> = {
  nylasAccountId: string
  nylasAccountAccessToken: Secret<S>
}

export type IntegrationScheduling<S = SavedSecret> = IntegrationBase & {
  type: 'SCHEDULING'
  configuration: {
    providers: IntegrationSchedulingProvider<S>[]
  }
}

export type IntegrationFreshdesk<S = SavedSecret> = IntegrationBase & {
  type: 'FRESHDESK'
  configuration: {
    baseUrl: string
    apiKey: Secret<S>
  }
}

export type IntegrationMailGun<S = SavedSecret> = IntegrationBase & {
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

export type IntegrationAPINSW<S = SavedSecret> = IntegrationBase & {
  type: 'API_NSW'
  configuration: {
    products: {
      liquor?: { apiKey: string; apiSecret: Secret<S> }
    }
  }
}

export type IntegrationGoogleMapsKey<S = SavedSecret> = {
  id: string
  type: 'SEARCH'
  label: string
  apiKey: Secret<S>
}

export type IntegrationGoogleMaps<S = SavedSecret> = IntegrationBase & {
  type: 'GOOGLE_MAPS'
  configuration: {
    keys: IntegrationGoogleMapsKey<S>[]
  }
}

export type DeleteIntegrationValidationResults = {
  forms: Array<{ formId: number; formName: string }>
  formsApps: Array<{ formsAppId: number; formsAppName: string }>
}

export type Integration<S = SavedSecret> =
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
