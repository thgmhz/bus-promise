'use strict';

var _linesResponse = require('./lines-response');

var _linesResponse2 = _interopRequireDefault(_linesResponse);

var _shapesResponse = require('./shapes-response');

var _shapesResponse2 = _interopRequireDefault(_shapesResponse);

var _stopsResponse = require('./stops-response');

var _stopsResponse2 = _interopRequireDefault(_stopsResponse);

var _corridorsResponse = require('./corridors-response');

var _corridorsResponse2 = _interopRequireDefault(_corridorsResponse);

var _vehiclesPositionResponse = require('./vehicles-position-response');

var _vehiclesPositionResponse2 = _interopRequireDefault(_vehiclesPositionResponse);

var _arrivalForecastResponse = require('./arrival-forecast-response');

var _arrivalForecastResponse2 = _interopRequireDefault(_arrivalForecastResponse);

var _lineForecastResponse = require('./line-forecast-response');

var _lineForecastResponse2 = _interopRequireDefault(_lineForecastResponse);

var _stopForecastResponse = require('./stop-forecast-response');

var _stopForecastResponse2 = _interopRequireDefault(_stopForecastResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  linesResponse: _linesResponse2.default,
  shapesResponse: _shapesResponse2.default,
  stopsResponse: _stopsResponse2.default,
  corridorsResponse: _corridorsResponse2.default,
  vehiclesPositionResponse: _vehiclesPositionResponse2.default,
  arrivalForecastResponse: _arrivalForecastResponse2.default,
  lineForecastResponse: _lineForecastResponse2.default,
  stopForecastResponse: _stopForecastResponse2.default
};