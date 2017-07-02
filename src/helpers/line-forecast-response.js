const vehicles = vehicles =>
  vehicles.map(vehicle => ({
    prefix: vehicle.p,
    accessible: vehicle.a,
    hour: vehicle.ta,
    lat: vehicle.py,
    lng: vehicle.px
  }))

const stops = stops =>
  stops.map(stop => ({
    stopId: stop.cp,
    name: stop.np,
    lat: stop.py,
    lng: stop.px,
    vehicles: vehicles(stop.vs)
  }))

export default function lineForecastResponse (line) {
  if (!line.ps) {
    return {
      hour: line.hr,
      stops: null
    }
  }

  return {
    hour: line.hr,
    stops: stops(line.ps)
  }
}
