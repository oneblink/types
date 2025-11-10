import { StatesAndTerritories } from '../misc'
import { Address } from './address-details'
import { Addresses } from './addresses'
import { paths } from './v3'

export { Address as PointAddress }
export { Addresses as PointAddressesSearchResult }
export type PointStatesAndTerritories = StatesAndTerritories | 'OT'

type PointCadastralParcelResponse = paths['/api/cadastralParcel']['get']['responses']['200']['content']['application/json']
type PointAddressV3SearchResponse = paths['/api/getSuggestedAddresses']['get']['responses']['200']['content']['application/json']
type PointAddressV3GetAddressDetailsResponse = paths['/api/getAddressDetails']['get']['responses']['200']['content']['application/json']
export {
  PointCadastralParcelResponse,
  PointAddressV3SearchResponse,
  PointAddressV3GetAddressDetailsResponse
}
