export type GoogleMapsAddress = Pick<
  google.maps.places.Place,
  | 'id'
  | 'displayName'
  | 'formattedAddress'
  | 'location'
  | 'addressComponents'
  | 'servesBeer'
>
