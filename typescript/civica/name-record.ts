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

export interface CivicaNameRecordElementConfigurations {
  givenNameLabel?: string
  givenNameLabelIsRequired?: boolean
  givenNameLabelIsHidden?: boolean

  emailAddressLabel?: string
  emailAddressLabelIsRequired?: boolean
  emailAddressLabelIsHidden?: boolean

  homePhoneLabel?: string
  homePhoneLabelIsRequired?: boolean
  homePhoneLabelIsHidden?: boolean

  businessPhoneLabel?: string
  businessPhoneLabelIsRequired?: boolean
  businessPhoneLabelIsHidden?: boolean

  mobilePhoneLabel?: string
  mobilePhoneLabelIsRequired?: boolean
  mobilePhoneLabelIsHidden?: boolean

  faxPhoneLabel?: string
  faxPhoneLabelIsRequired?: boolean
  faxPhoneLabelIsHidden?: boolean

  address1Label?: string
  address2Label?: string
  postcodeLabel?: string
}
