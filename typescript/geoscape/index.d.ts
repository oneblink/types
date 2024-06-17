import { Address } from './address-details'
import { AddressSuggestion } from './addresses'

export { Address as GeoscapeAddress }
export { AddressSuggestion as GeoscapeAddressesSearchResult }

export type GeoscapeStatesAndTerritories =
  | 'NSW'
  | 'QLD'
  | 'VIC'
  | 'ACT'
  | 'TAS'
  | 'SA'
  | 'NT'
  | 'WA'
