export default function stopsResponse (stops) {
  return stops.map(stop => ({
    stopId: stop.CodigoParada,
    name: stop.Nome,
    address: stop.Endereco,
    lat: stop.Latitude,
    lng: stop.Longitude
  }))
}
