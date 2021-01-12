// @flow

export type StateElectorate = {
  stateElectoralName?: string,
  stateElectoralType?: string,
  [k: string]: mixed,
}[]
export type MessagesLegacy = {
  code?: string,
  description?: string,
  message?: string,
  severity?: string,
  [k: string]: mixed,
}[]

export interface Address {
  addressDetails?: AddressDetails;
  addressId: string;
  addressRecordType: 'Primary' | 'Secondary';
  asgsMain?: ASGSMain;
  asgsRemoteness?: ASGSRemoteness;
  buildingsRolloutStatus: 'RELEASED';
  commonwealthElectorate?: CommonwealthElectorate;
  geo?: Geo;
  links: AddressLinks;
  localGovernmentArea?: LocalGovernmentArea;
  relatedBuildingIds?: string[];
  stateElectorate?: StateElectorate;
  messages?: MessagesLegacy;
  [k: string]: mixed;
}
export interface AddressDetails {
  cadastralIdentifier?: string;
  formattedAddress?: string;
  localityName?: string;
  postcode?: string;
  stateTerritory?: string;
  streetName?: string;
  streetNumber1?: string;
  streetNumber2?: string;
  complexUnitIdentifier?: string;
  complexUnitType?: string;
  siteName?: string;
  streetType?: string;
  lotIdentifier?: string;
  streetSuffix?: string;
  streetPrefix?: string;
  complexLevelIdentifier?: string;
  complexLevelType?: string;
  [k: string]: mixed;
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
export type ASGSRemoteness = {
  '2011'?: {
    categoryCode?: string,
    categoryName?: string,
    code?: string,
    [k: string]: mixed,
  },
  '2016'?: {
    categoryCode?: string,
    categoryName?: string,
    code?: string,
    [k: string]: mixed,
  },
  [k: string]: mixed,
}
export interface CommonwealthElectorate {
  commElectoralName?: string;
  commElectoralPid?: string;
  [k: string]: mixed;
}
export interface Geo {
  geoDatumCode?: string;
  geoFeature?: string;
  geometry?: {
    coordinates?: number[],
    type?: string,
    [k: string]: mixed,
  };
  [k: string]: mixed;
}
export interface AddressLinks {
  addressDetails?: string;
  asgsMain?: string;
  asgsRemoteness?: string;
  commonwealthElectorate?: string;
  geo?: string;
  localGovernmentArea?: string;
  stateElectorate?: string;
  [k: string]: mixed;
}
export interface LocalGovernmentArea {
  lgaName?: string;
  lgaPid?: string;
  lgaShortName?: string;
  [k: string]: mixed;
}
