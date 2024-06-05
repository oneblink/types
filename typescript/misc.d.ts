export interface UserProfile {
  /** `true` if the user logged in using a SAML provider */
  isSAMLUser?: boolean
  /** Which provider was used to login */
  providerType?: string
  /** The id of the user from the login provider */
  providerUserId?: string
  /** The id of the user from OneBlink */
  userId: string
  /** The username used to login */
  username: string
  /** The user's email address */
  email?: string
  /** True if the email address is verified */
  emailVerified?: boolean
  /** The user's first name */
  firstName?: string
  /** The user's last name */
  lastName?: string
  /** The user's full name */
  fullName?: string
  /** A URL to a picture of the user */
  picture?: string
  /** The user's role from a SAML configuration */
  role?: string
  /** The user's supervisor information from a SAML configuration */
  supervisor?: {
    /** The user's supervisor's full name */
    fullName?: string
    /** The user's supervisor's full email address */
    email?: string
    /** The user's supervisor's user id from the login provider */
    providerUserId?: string
  }
  /** The user's phone number from a SAML configuration */
  phoneNumber?: string
  /** True if the phone number is verified */
  phoneNumberVerified?: boolean
  /** The users list of groups from a SAML configuration */
  groups?: string[]
}
export interface QueryParameters {
  [property: string]: string | Array<string | number> | null
}

export type GenericObject = Record<string, unknown>

export type BaseSearchResult = {
  meta: {
    limit?: number
    offset?: number
    nextOffset?: number
  }
}

interface ABNValue {
  identifierValue: string
  isCurrentIndicator: string
  replacedFrom: string
}

export type ABNRecord = {
  recordLastUpdatedDate: string
  ABN: ABNValue | ABNValue[]
  entityStatus: {
    entityStatusCode: string
    effectiveFrom: string
    effectiveTo: string
  }
  ASICNumber: string
  entityType: {
    entityTypeCode: string
    entityDescription: string
  }
  goodsAndServicesTax?: {
    effectiveFrom: string
    effectiveTo: string
  }
  mainName?: {
    organisationName: string
    effectiveFrom: string
  }
  legalName?: {
    givenName?: string
    otherGivenName?: string
    familyName?: string
  }
  mainTradingName?: {
    organisationName: string
    effectiveFrom: string
  }
  otherTradingName?: {
    organisationName: string
    effectiveFrom: string
  }
  mainBusinessPhysicalAddress?: {
    stateCode: string
    postcode: string
    effectiveFrom: string
    effectiveTo: string
  }
  businessName: Array<{
    organisationName: string
    effectiveFrom: string
  } | null>
}

export type BSBRecord = {
  bsb: string
  financialInstitutionMnemonic: string
  name: string
  street: string
  suburb: string
  state: string
  postcode: string
  paymentsFlags?: string
}

export type IdResource = {
  /** The id the resource */
  id: number
  /** The date and time (in ISO format) the resource was created */
  createdAt: string
  /** The date and time (in ISO format) the resource was last updated */
  updatedAt: string
}

/**
 * ### Examples
 *
 * ```json
 * {
 *   "type": "CALLBACK",
 *   "configuration": {
 *     "url": "https://api.url.com/callback"
 *   }
 * }
 * ```
 */
export type EndpointConfigurationCallback = {
  /** The type of endpoint. */
  type: 'CALLBACK'
  /** The configuration of the endpoint. */
  configuration: {
    /** URL that the request is made to. */
    url: string
    /**
     * Secret string used for verifying the authenticity of the request made
     * from the OneBlink system.
     */
    secret?: string
  }
}

/**
 * ### Examples
 *
 * ```json
 * {
 *   "type": "ONEBLINK_API",
 *   "configuration": {
 *     "apiId": "oneblink-api-id",
 *     "apiEnvironment": "test",
 *     "apiEnvironmentRoute": "/my-route"
 *   }
 * }
 * ```
 */
export type EndpointConfigurationAPI = {
  /** The type of endpoint. */
  type: 'ONEBLINK_API'
  /** The configuration of the OneBlink Hosted API. */
  configuration: {
    /** The ID of the OneBlink hosted API that a request is made to. */
    apiId: string
    /** The environment of the specified OneBlink hosted API. */
    apiEnvironment: string
    /** The route of the specified API and Environment. */
    apiEnvironmentRoute: string
    /**
     * Secret string used for verifying the authenticity of the request made
     * from the OneBlink system.
     */
    secret?: string
  }
}

export type EndpointConfiguration =
  | EndpointConfigurationCallback
  | EndpointConfigurationAPI

export type CustomerSecret = {
  id: number
  createdAt: string
  updatedAt: string
  cipherText: string
  kmsKeyAliasArn: string
  kmsKeyArn: string
}
