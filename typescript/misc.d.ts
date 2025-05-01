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
  /** The user's middle name */
  middleName?: string
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
  /** The user's address area/zip/post code */
  areaCode?: string
  /** The user's address */
  address?: string
  /** The user's city */
  city?: string
  /** The user's state */
  state?: string
  /** The user's country */
  country?: string
  /** The user's country calling code */
  countryCallingCode?: string
  /** The user's department */
  department?: string
  /** The user's division */
  division?: string
  /** The user's bargain */
  bargain?: string
  /** The user's employee number */
  employeeNumber?: string
  /** The users' department head's full name */
  departmentHeadFullName?: string
  /** The users' department head's email address */
  departmentHeadEmail?: string
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
     * The identifier for the organisation managed secret that is associated
     * with the endpoint. Should represent the secret string used for verifying
     * the authenticity of the request made from the OneBlink system.
     */
    organisationManagedSecretId?: number
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
     * The identifier for the organisation managed secret that is associated
     * with the endpoint. Should represent the secret string used for verifying
     * the authenticity of the request made from the OneBlink system.
     */
    organisationManagedSecretId?: number
  }
}

export type EndpointConfiguration =
  | EndpointConfigurationCallback
  | EndpointConfigurationAPI

export type NewCustomerSecret = {
  /** The encrypted version of the secret */
  cipherText: string
  /** The ARN of the KMS key alias that was used to encrypt the secret */
  kmsKeyAliasArn: string
  /** The ARN of the KMS key that was used to encrypt the secret */
  kmsKeyArn: string
}

export type CustomerSecret = IdResource & NewCustomerSecret

export type NewOrganisationManagedSecret = NewCustomerSecret & {
  /** Display text to represent the secret */
  label: string
  /** The identifier for the organisation associated with the secret. */
  organisationId: string
}

export type OrganisationManagedSecret = IdResource &
  NewOrganisationManagedSecret

export type StatesAndTerritories =
  | 'NSW'
  | 'QLD'
  | 'VIC'
  | 'ACT'
  | 'TAS'
  | 'SA'
  | 'NT'
  | 'WA'

export type EmailSendingAddressBase = {
  emailAddress: string
  emailName?: string
  createdAt: string
  updatedAt: string
}

export type EmailSendingAddressMailgun = {
  type: 'MAILGUN'
}

export type EmailSendingAddressSES = {
  type: 'SES'
  isEmailVerified: boolean
}

export type EmailSendingAddressResponseBase = {
  integration: EmailSendingAddressSES | EmailSendingAddressMailgun
}
