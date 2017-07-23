const vehicles = data =>
  data.map(vehicle => ({
    prefix: vehicle.p,
    accessible: vehicle.a,
    hour: vehicle.ta,
    lat: vehicle.py,
    lng: vehicle.px
  }))

export default function vehiclesPositionResponse (data) {
  if (!data.vs.length) {
    return {
      hour: data.hr,
      vehicles: null
    }
  }

  return {
    hour: data.hr,
    vehicles: vehicles(data.vs)
  }
}
