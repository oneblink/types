// @flow

export type StateElectorate = {
  stateElectoralName?: string,
  stateElectoralType?: string,
  [k: string]: mixed,
}[]
export type CadastralParcels = {
  propId?: string,
  parcelId?: string[],
  [k: string]: mixed,
}[]

export type PointAddressResponse = {
  data: Address,
  requestTimestamp: string,
  requestDate: string,
  [k: string]: mixed,
}
export type Address = {
  dataset?: string,
  geo?: Geo,
  addressDetails?: AddressDetails,
  addressId: string,
  addressRecordType: 'Primary' | 'Secondary',
  asgsMain?: ASGSMain,
  commonwealthElectorate?: CommonwealthElectorate,
  localGovernmentArea?: LocalGovernmentArea,
  stateElectorate?: StateElectorate,
  cadastralParcels?: CadastralParcels,
  [k: string]: mixed,
}
export type Geo = {
  geoDatumCode?: string,
  geoFeature?: string,
  geometry?: {
    coordinates?: number[],
    type?: string,
    [k: string]: mixed,
  },
  [k: string]: mixed,
}
export type AddressDetails = {
  cadastralIdentifier?: string,
  formattedAddress?: string,
  localityName?: string,
  postcode?: string,
  stateTerritory?: string,
  streetName?: string,
  streetNumber1?: string,
  streetNumber2?: string,
  streetType?: string,
  streetTypeDescription?: string,
  lotIdentifier?: string,
  localityNeighbours?: string,
  gnafLocalityPid?: string,
  gnafStreetLocalityPid?: string,
  aliasPrincipal?: string,
  deliveryPointIdentifier?: string,
  [k: string]: mixed,
}
export type ASGSMain = {
  '2011'?: {
    mbId?: string,
    sa1Id?: string,
    sa2Id?: string,
    sa2Name?: string,
    sa3Id?: string,
    sa3Name?: string,
    sa4Id?: string,
    sa4Name?: string,
    [k: string]: mixed,
  },
  '2016'?: {
    mbId?: string,
    sa1Id?: string,
    sa2Id?: string,
    sa2Name?: string,
    sa3Id?: string,
    sa3Name?: string,
    sa4Id?: string,
    sa4Name?: string,
    [k: string]: mixed,
  },
  [k: string]: mixed,
}
export type CommonwealthElectorate = {
  commElectoralName?: string,
  commElectoralPid?: string,
  [k: string]: mixed,
}
export type LocalGovernmentArea = {
  lgaName?: string,
  lgaPid?: string,
  lgaShortName?: string,
  [k: string]: mixed,
}
