export interface CivicaNameRecord {
  title: string
  givenName1?: string
  familyName: string
  emailAddress?: string
  homePhone?: string
  businessPhone?: string
  mobilePhone?: string
  faxPhone?: string
  streetAddress: StreetAddress[]
}

export interface StreetAddress {
  address1: string
  address2: string
  postcode: string
}
