import axios from 'axios'
import { API } from '../constants'

export default async function buildLinhasResponse (linhas) {
  const buildPromise = tripId =>
    axios({
      method: 'get',
      url: `${API.server}/trips/${tripId}`
    })

  const parseShapeId = res =>
    res.map(item => {
      if (item.data[0]) return item.data[0].shape_id
      return null
    })

  const getShapesIds = tripsIds => {
    const promises = tripsIds.map(buildPromise)
    return Promise.all(promises).then(parseShapeId)
  }

  const tripsIds = linhas.map(item =>
    `${item.Letreiro}-${item.Tipo}-${item.Sentido - 1}`)

  const shapesIds = await getShapesIds(tripsIds)

  const response = linhas.map((item, key) => ({
    CodigoLinha: item.CodigoLinha,
    CodigoTrajeto: shapesIds[key],
    Circular: item.Circular,
    Letreiro: item.Letreiro,
    Sentido: item.Sentido,
    Tipo: item.Tipo,
    DenominacaoTPTS: item.DenominacaoTPTS,
    DenominacaoTSTP: item.DenominacaoTSTP,
    Informacoes: item.Informacoes
  }))

  return response
}
