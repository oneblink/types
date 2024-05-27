export type GoogleMapsAddress = {
  place_id: google.maps.places.PlaceResult['place_id']
  formatted_address: google.maps.places.PlaceResult['formatted_address']
  address_components: google.maps.places.PlaceResult['address_components']
  geometry: {
    location?: google.maps.LatLngLiteral
    viewport?: google.maps.LatLngBoundsLiteral
  }
}
