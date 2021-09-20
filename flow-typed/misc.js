// @flow

declare type UserProfile = {
  isSAMLUser?: boolean,
  providerType?: string,
  providerUserId?: string,
  userId: string,
  username: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  fullName?: string,
  picture?: string,
  role?: string,
  supervisor?: {
    fullName?: string,
    email?: string,
    providerUserId?: string,
  },
}

declare type QueryParameters = {
  [property: string]: string | Array<string | number> | null,
}

declare type BaseSearchResult = {
  meta: {
    limit?: number,
    offset?: number,
    nextOffset?: number,
  },
}

declare type BSBRecord = {
  bsb: string,
  financialInstitutionMnemonic: string,
  name: string,
  street: string,
  suburb: string,
  state: string,
  postcode: string,
  paymentsFlags?: string,
}
