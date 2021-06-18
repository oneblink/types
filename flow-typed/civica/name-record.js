// @flow

export type CivicaNameRecord = {
  title: string,
  givenName1?: string,
  familyName: string,
  emailAddress?: string,
  homePhone?: string,
  businessPhone?: string,
  mobilePhone?: string,
  faxPhone?: string,
  streetAddress: StreetAddress[],
}

export type StreetAddress = {
  address1: string,
  address2: string,
  postcode: string,
}
export type CivicaNameRecordElementConfigurations = {
  givenName1Label?: string,
  givenName1IsRequired?: boolean,
  givenName1IsHidden?: boolean,

  emailAddressLabel?: string,
  emailAddressIsRequired?: boolean,
  emailAddressIsHidden?: boolean,

  homePhoneLabel?: string,
  homePhoneIsRequired?: boolean,
  homePhoneIsHidden?: boolean,

  businessPhoneLabel?: string,
  businessPhoneIsRequired?: boolean,
  businessPhoneIsHidden?: boolean,

  mobilePhoneLabel?: string,
  mobilePhoneIsRequired?: boolean,
  mobilePhoneIsHidden?: boolean,

  faxPhoneLabel?: string,
  faxPhoneIsRequired?: boolean,
  faxPhoneIsHidden?: boolean,

  address1Label?: string,
  address2Label?: string,
  postcodeLabel?: string,
}
