const vehicles = vehicles =>
  vehicles.map(vehicle => ({
    prefix: vehicle.p,
    accessible: vehicle.a,
    hour: vehicle.ta,
    lat: vehicle.py,
    lng: vehicle.px
  }))

const lines = lines =>
  lines.map(line => ({
    lineId: line.cl,
    displaySign: line.c,
    direction: line.sl,
    mainTerminal: line.lt0,
    secondaryTerminal: line.lt1,
    quantity: line.qv,
    vehicles: vehicles(line.vs)
  }))

export default function stopForecastResponse (stop) {
  if (!stop.p) {
    return {
      hour: stop.hr,
      stop: null
    }
  }

  return {
    hour: stop.hr,
    stop: {
      stopId: stop.p.cp,
      name: stop.p.np,
      lat: stop.p.py,
      lng: stop.p.px,
      lines: lines(stop.p.l)
    }
  }
}
