export type GoogleMapsAddress = Pick<
  google.maps.places.PlaceResult,
  'place_id' | 'formatted_address' | 'geometry' | 'address_components'
>
