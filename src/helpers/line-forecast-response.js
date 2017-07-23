const vehicles = data =>
  data.map(vehicle => ({
    prefix: vehicle.p,
    accessible: vehicle.a,
    hour: vehicle.t,
    lat: vehicle.py,
    lng: vehicle.px
  }))

const stops = data =>
  data.map(stop => ({
    stopId: stop.cp,
    name: stop.np,
    lat: stop.py,
    lng: stop.px,
    vehicles: vehicles(stop.vs)
  }))

export default function lineForecastResponse (data) {
  if (!data.ps) {
    return {
      hour: data.hr,
      stops: null
    }
  }

  return {
    hour: data.hr,
    stops: stops(data.ps)
  }
}
