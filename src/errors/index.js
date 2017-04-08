const SpBusPromiseError = ({ message, type, errors }) => {
  this.message = message
  this.type = type
  this.errors = errors
}

SpBusPromiseError.prototype = new Error()

export default SpBusPromiseError
