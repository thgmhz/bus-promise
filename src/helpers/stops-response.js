export default function stopsResponse (data, terms) {
  if (terms === '*') {
    return data.map(stop => ({
      stopId: stop.stop_id,
      name: stop.stop_name,
      address: stop.stop_desc,
      lat: stop.stop_lat,
      lng: stop.stop_lon
    }))
  }

  return data.map(stop => ({
    stopId: stop.cp,
    name: stop.np,
    address: stop.ed,
    lat: stop.py,
    lng: stop.px
  }))
}
