import { StatesAndTerritories } from '../misc'
import { Address } from './address-details'
import { Addresses } from './addresses'
import { paths } from './v3'

export { Address as PointAddress }
export { Addresses as PointAddressesSearchResult }
export type PointStatesAndTerritories = StatesAndTerritories | 'OT'

type PointCadastralParcelResponse = paths['/api/cadastralParcel']['get']['responses']['200']['content']['application/json']
export {
  PointCadastralParcelResponse
}
