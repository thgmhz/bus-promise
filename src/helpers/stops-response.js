export default function stopsResponse (stops) {
  return stops.map(stop => ({
    stopId: stop.cp,
    name: stop.np,
    address: stop.ed,
    lat: stop.py,
    lng: stop.px
  }))
}
