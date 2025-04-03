import { StatesAndTerritories } from '../misc'
import { Address } from './address-details-v2'
import { Addresses } from './addresses'
import { AddressResponseV3 } from './address-details-v3'

export { Address as PointAddress }
export { AddressResponseV3 as PointAddressResponseV3 }
export { Addresses as PointAddressesSearchResult }

export type PointStatesAndTerritories = StatesAndTerritories | 'OT'
