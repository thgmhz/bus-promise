import { ALLOWED_TYPES } from './constants'

const handleError = err => {
  throw new Error(err)
}

const validateParams = params => {
  !params && handleError('O método "find" deve receber parâmetros.')

  !ALLOWED_TYPES.includes(params.type) && handleError('Parâmetro "type" não encontrado.')

  if (params.type === 'linhas' || params.type === 'paradas') {
    !params.term && handleError('O parâmetro "term" não pode ser nulo.')
  }
}

export default params => {
  validateParams(params)
}
