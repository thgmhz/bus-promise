import axios from 'axios'
import { API } from '../constants'

export default async function buildLinhasResponse (lines) {
  const buildPromise = tripId =>
    axios({
      method: 'get',
      url: `${API.server}/trips/${tripId}`
    })

  const parseShapeId = res =>
    res.map(item =>
      item.data[0] ? item.data[0].shape_id : null)

  const getShapesIds = tripsIds => {
    const promises = tripsIds.map(buildPromise)
    return Promise.all(promises).then(parseShapeId)
  }

  const tripsIds = lines.map(item =>
    `${item.lt}-${item.tl}-${item.sl - 1}`)

  const shapesIds = await getShapesIds(tripsIds)

  const response = lines.map((item, key) => ({
    lineId: item.cl,
    shapeId: shapesIds[key],
    circular: item.lc,
    displaySign: item.lt,
    direction: item.sl,
    type: item.tl,
    mainTerminal: item.tp,
    secondaryTerminal: item.ts,
  }))

  return response
}
