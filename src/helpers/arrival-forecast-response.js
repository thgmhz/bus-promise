const vehicles = data =>
  data.map(vehicle => ({
    prefix: vehicle.p,
    accessible: vehicle.a,
    hour: vehicle.t,
    lat: vehicle.py,
    lng: vehicle.px
  }))

const lines = data =>
  data.map(line => ({
    lineId: line.cl,
    displaySign: line.c,
    direction: line.sl,
    mainTerminal: line.lt0,
    secondaryTerminal: line.lt1,
    quantity: line.qv,
    vehicles: vehicles(line.vs)
  }))

export default function arrivalForecastResponse (data) {
  if (!data.p) {
    return {
      hour: data.hr,
      stop: null
    }
  }

  return {
    hour: data.hr,
    stop: {
      stopId: data.p.cp,
      name: data.p.np,
      lat: data.p.py,
      lng: data.p.px,
      lines: lines(data.p.l)
    }
  }
}
