import { EmailSendingAddressMailgun } from './misc'

type IntegrationBase = {
  organisationId: string
  updatedAt: Date
  createdAt: Date
}

export type SavedSecret = {
  secretPointer: number
}
export type RawSecret = string

export type Secret = SavedSecret | RawSecret

type ConstrainedSecret<T> = T extends Secret ? T : SavedSecret

type IntegrationEnvironmentBaseUrl = {
  id: string
  label: string
  baseUrl: string
}
export type IntegrationTrimEnvironmentUsername<S = SavedSecret> =
  IntegrationEnvironmentBaseUrl & {
    authType?: 'USERNAME'
    username: string
    password: ConstrainedSecret<S>
  }
export type IntegrationTrimEnvironmentOAuth<S = SavedSecret> =
  IntegrationEnvironmentBaseUrl & {
    authType: 'OAUTH'
    tokenUrl: string
    clientId: string
    clientSecret: ConstrainedSecret<S>
  }

export type IntegrationTrimEnvironment<S = SavedSecret> =
  | IntegrationTrimEnvironmentUsername<S>
  | IntegrationTrimEnvironmentOAuth<S>

export type IntegrationTrim<S = SavedSecret> = IntegrationBase & {
  type: 'TRIM'
  configuration: {
    environments: Array<IntegrationTrimEnvironment<S>>
  }
}
type IntegrationCivicaEnvironmentBase<S = SavedSecret> =
  IntegrationEnvironmentBaseUrl & {
    username: string
    password: ConstrainedSecret<S>
  }
export type IntegrationCivicaEnvironmentUsername<S = SavedSecret> =
  IntegrationCivicaEnvironmentBase<S> & {
    authType?: 'USERNAME'
  }
export type IntegrationCivicaEnvironmentOAuth<S = SavedSecret> =
  IntegrationCivicaEnvironmentBase<S> & {
    authType: 'OAUTH_PASSWORD'
    tokenUrl: string
    clientId: string
    clientSecret: ConstrainedSecret<S>
  }
export type IntegrationCivicaEnvironment<S = SavedSecret> =
  | IntegrationCivicaEnvironmentUsername<S>
  | IntegrationCivicaEnvironmentOAuth<S>
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
  clientSecret: ConstrainedSecret<S>
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
    clientSecret: ConstrainedSecret<S>
  }
}

export type IntegrationRecaptcha<S = SavedSecret> = IntegrationBase & {
  type: 'RECAPTCHA'
  configuration: {
    domains: IntegrationRecaptchaDomain<S>[]
  }
}
export type RecaptchaKeyType = 'INVISIBLE' | 'CHECKBOX'

export type IntegrationRecaptchaDomain<S = SavedSecret> = {
  /** If `undefined`, the default will be CHECKBOX */
  type?: RecaptchaKeyType
  id: string
  label: string
  privateKey: ConstrainedSecret<S>
  publicKey: string
}
export type IntegrationBPOINTEnvironment<S = SavedSecret> = {
  id: string
  label: string
  baseUrl: string
  username: string
  password: ConstrainedSecret<S>
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
  clientSecret: ConstrainedSecret<S>
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
export type IntegrationNSWGovPay<S = SavedSecret> = IntegrationBase & {
  type: 'NSW_GOV_PAY'
  /** Integration configuration */
  configuration: {
    /** The primary agencies configured in NSW GovPay */
    primaryAgencies: IntegrationNSWGovPayPrimaryAgency<S>[]
  }
}

export type IntegrationWestpacQuickStreamEnvironment<S = SavedSecret> = {
  id: string
  label: string
  publishableApiKey: string
  secretApiKey: ConstrainedSecret<S>
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
    apiKey: ConstrainedSecret<S>
  }
}

export type IntegrationPointEnvironment<S = SavedSecret> = {
  id: string
  label: string
  apiKey: ConstrainedSecret<S>
} & (
  | {
      version?: 'v2'
    }
  | {
      version: 'v3'
    }
)

export type IntegrationPoint<S = SavedSecret> = IntegrationBase & {
  type: 'POINT'
  configuration: {
    environments: IntegrationPointEnvironment<S>[]
  }
}

export type IntegrationNylasGrant = {
  nylasGrantId: string
}

export type IntegrationNylas = IntegrationBase & {
  type: 'NYLAS'
  configuration: {
    grants: IntegrationNylasGrant[]
  }
}

export type IntegrationFreshdesk<S = SavedSecret> = IntegrationBase & {
  type: 'FRESHDESK'
  configuration: {
    baseUrl: string
    apiKey: ConstrainedSecret<S>
  }
}

export type IntegrationMailGun<S = SavedSecret> = IntegrationBase & {
  type: EmailSendingAddressMailgun['type']
  configuration: {
    domain: string
    apiKey: ConstrainedSecret<S>
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
      liquor?: { apiKey: string; apiSecret: ConstrainedSecret<S> }
    }
  }
}

export type IntegrationGoogleMapsKey<S = SavedSecret> = {
  id: string
  type: 'SEARCH'
  label: string
  apiKey: ConstrainedSecret<S>
}

export type IntegrationGoogleMaps<S = SavedSecret> = IntegrationBase & {
  type: 'GOOGLE_MAPS'
  configuration: {
    keys: IntegrationGoogleMapsKey<S>[]
  }
}

export type IntegrationMicrosoftEntraApplication<S = SavedSecret> = {
  id: string
  label: string
  entraTenantId: string
  entraApplicationId: string
  entraClientSecret: ConstrainedSecret<S>
}

export type IntegrationSharepoint<S = SavedSecret> = IntegrationBase & {
  type: 'SHAREPOINT'
  configuration: {
    entraApplications: IntegrationMicrosoftEntraApplication<S>[]
  }
}

export type IntegrationExcel<S = SavedSecret> = IntegrationBase & {
  type: 'EXCEL'
  configuration: {
    entraApplications: IntegrationMicrosoftEntraApplication<S>[]
  }
}

export type IntegrationCivicRecEnvironment<S = SavedSecret> =
  IntegrationEnvironmentBaseUrl & {
    secret: ConstrainedSecret<S>
  }

export type IntegrationCivicRec<S = SavedSecret> = IntegrationBase & {
  type: 'CIVIC_REC'
  configuration: {
    environments: IntegrationCivicRecEnvironment<S>[]
  }
}

export type IntegrationGoodToGoEnvironmentKey<S = SavedSecret> = {
  id: string
  label: string
  apiKey: ConstrainedSecret<S>
}

export type IntegrationGoodToGo<S = SavedSecret> = IntegrationBase & {
  type: 'GOOD_TO_GO'
  configuration: {
    keys: IntegrationGoodToGoEnvironmentKey<S>[]
  }
}

export type IntegrationSalesForceEnvironment<S = SavedSecret> = {
  id: string
  label: string
  consumerKey: string
  consumerSecret: ConstrainedSecret<S>
  loginUrl: string
}
export type IntegrationSalesForce<S = SavedSecret> = IntegrationBase & {
  type: 'SALES_FORCE'
  configuration: {
    environments: IntegrationSalesForceEnvironment<S>[]
  }
}

export type DeleteIntegrationValidationResults = {
  forms: Array<{
    formId: number
    formName: string
    integrationEnvironmentIds?: string[]
  }>
  formsApps: Array<{
    formsAppId: number
    formsAppName: string
    integrationEnvironmentIds?: string[]
  }>
  optionSets: Array<{
    optionSetId: number
    optionSetName: string
    integrationEnvironmentIds?: string[]
  }>
}

export type Integration<S = SavedSecret> =
  | IntegrationTrim<S>
  | IntegrationCPPay<S>
  | IntegrationCPHCMS<S>
  | IntegrationBPOINT<S>
  | IntegrationGeoscape<S>
  | IntegrationPoint<S>
  | IntegrationRecaptcha<S>
  | IntegrationWestpacQuickStream<S>
  | IntegrationCivica<S>
  | IntegrationFreshdesk<S>
  | IntegrationMailGun<S>
  | IntegrationNSWGovPay<S>
  | IntegrationAPINSW<S>
  | IntegrationGoogleMaps<S>
  | IntegrationNylas
  | IntegrationSharepoint<S>
  | IntegrationCivicRec<S>
  | IntegrationGoodToGo<S>
  | IntegrationExcel<S>
  | IntegrationSalesForce<S>
export type IntegrationType = Integration['type']
