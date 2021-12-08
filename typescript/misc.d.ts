export type NoU = null | undefined

export interface UserProfile {
  isSAMLUser?: boolean
  providerType?: string
  providerUserId?: string
  userId: string
  username: string
  email?: string
  firstName?: string
  lastName?: string
  fullName?: string
  picture?: string
  role?: string
  supervisor?: {
    fullName?: string
    email?: string
    providerUserId?: string
  }
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

export type ABNRecord = {
  recordLastUpdatedDate: string
  ABN: {
    identifierValue: string
    isCurrentIndicator: string
    replacedFrom: string
  }
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
  goodsAndServicesTax: {
    effectiveFrom: string
    effectiveTo: string
  }
  mainName: {
    organisationName: string
    effectiveFrom: string
  }
  mainTradingName: {
    organisationName: string
    effectiveFrom: string
  }
  otherTradingName: {
    organisationName: string
    effectiveFrom: string
  }
  mainBusinessPhysicalAddress: {
    stateCode: string
    postcode: string
    effectiveFrom: string
    effectiveTo: string
  }
  businessName: Array<{
    organisationName: string
    effectiveFrom: string
  }>
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
