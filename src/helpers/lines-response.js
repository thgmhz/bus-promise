import axios from 'axios'
import { API } from '../constants'

export default function linesResponse (lines, terms) {
  if (terms === '*') {
    return lines.map(line => ({
      direction: line.direction_id,
      shapeId: line.shape_id,
      mainTerminal: line.trip_headsign,
      displaySign: line.route_id.split('-')[0],
      type: line.route_id.split('-')[1]
    }))
  }

  const buildPromise = tripId =>
    axios({
      method: 'get',
      url: `${API.server}/trips/${tripId}`
    })

  const parseShapeId = res =>
    res.map(item => item.data[0] ? item.data[0].shape_id : null)

  const getShapesIds = tripsIds => {
    const promises = tripsIds.map(buildPromise)
    return Promise.all(promises).then(parseShapeId)
  }

  const tripsIds = lines.map(item =>
    `${item.lt}-${item.tl}-${item.sl - 1}`)

  return getShapesIds(tripsIds).then(shapesIds =>
    lines.map((item, key) => ({
      lineId: item.cl,
      shapeId: shapesIds[key],
      circular: item.lc,
      displaySign: item.lt,
      direction: item.sl,
      type: item.tl,
      mainTerminal: item.tp,
      secondaryTerminal: item.ts
    })))
}
