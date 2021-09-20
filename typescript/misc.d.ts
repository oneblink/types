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
