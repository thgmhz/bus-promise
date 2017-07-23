export default function stopsResponse (data) {
  return data.map(stop => ({
    stopId: stop.cp,
    name: stop.np,
    address: stop.ed,
    lat: stop.py,
    lng: stop.px
  }))
}
