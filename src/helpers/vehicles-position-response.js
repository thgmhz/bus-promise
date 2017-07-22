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

export default function vehiclesPositionResponse (vehicles) {
  if (!vehicles.l.length) {
    return {
      hour: vehicles.hr,
      lines: null
    }
  }

  return {
    hour: vehicles.hr,
    lines: lines(vehicles.l)
  }
}
