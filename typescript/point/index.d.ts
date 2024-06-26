import { StatesAndTerritories } from '../misc'
import { Address } from './address-details'
import { Addresses } from './addresses'

export { Address as PointAddress }
export { Addresses as PointAddressesSearchResult }

export type PointStatesAndTerritories = StatesAndTerritories | 'OT'
