'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('./constants');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = typeof window !== 'undefined';

function handleError(err) {
  throw new Error(err);
}

function hasOptions(options) {
  options || handleError('The "find" method should receive an object with options.');
  return options;
}

function hasAuth(options) {
  options.auth || handleError('The "find" method should receive the "auth" parameter.');
  return options;
}

function isAllowedType(options) {
  options.type in _constants.API || handleError('The "' + options.type + '" type does not exist.');
  return options;
}

function getRequiredParams(options) {
  return _constants.API[options.type].required;
}

function hasRequiredParams(options) {
  var requiredParams = getRequiredParams(options);
  if (!requiredParams) return options;

  var optionsHasParam = function optionsHasParam(param) {
    return !(param in options);
  };
  var missingParams = requiredParams.filter(optionsHasParam);
  missingParams.length === 0 || handleError('Required parameter(s): "' + missingParams + '".');

  return options;
}

function buildParams(options) {
  var requiredParams = getRequiredParams(options);
  if (!requiredParams) return options;

  var build = function build(obj, current) {
    var paramName = _constants.API[options.type].proxyParams[current];
    var paramValue = options[current];
    if (paramValue instanceof Array) {
      return paramValue.map(function (value) {
        return (0, _defineProperty3.default)({}, paramName, value);
      });
    }
    obj[paramName] = paramValue;

    return obj;
  };

  var params = requiredParams.reduce(build, {});

  return (0, _assign2.default)(options, { params: params });
}

function validateHttpStatus(res) {
  res.status === 200 || handleError('Error ' + res.status + ' when connecting to the SPTrans service.');
  return res;
}

function handleResponse(res, options) {
  if (options.terms === '*') return res.data;

  var data = res.data;
  var type = options.type;

  if (type === 'lines') return (0, _helpers.linesResponse)(data);
  if (type === 'shapes') return (0, _helpers.shapesResponse)(data);
  if (type === 'stops') return (0, _helpers.stopsResponse)(data);
  if (type === 'stopsByCorridor') return (0, _helpers.stopsResponse)(data);
  if (type === 'stopsByLine') return (0, _helpers.stopsResponse)(data);
  if (type === 'corridors') return (0, _helpers.corridorsResponse)(data);
  if (type === 'vehiclesPosition') return (0, _helpers.vehiclesPositionResponse)(data);
  if (type === 'arrivalForecast') return (0, _helpers.arrivalForecastResponse)(data);
  if (type === 'lineForecast') return (0, _helpers.lineForecastResponse)(data);
  if (type === 'stopForecast') return (0, _helpers.stopForecastResponse)(data);
}

function fetchData(options) {
  var buildPromise = function buildPromise(params) {
    var url = _constants.API.sptrans + _constants.API[options.type].route;
    var headers = {
      Cookie: options.auth
    };

    if (isBrowser && params) {
      headers = null;
      url = _constants.API.server + '/find';
      (0, _assign2.default)(params, {
        auth: options.auth,
        route: _constants.API[options.type].route
      });
    }

    if (options.type === 'shapes') {
      headers = null;
      url = _constants.API.server + '/shapes/' + options.shapeId;
    }

    if (options.type === 'lines' && options.terms === '*') {
      headers = null;
      url = _constants.API.server + '/trips';
    }

    var config = {
      method: 'get',
      url: url,
      headers: headers,
      params: params
    };

    return (0, _axios2.default)(config);
  };

  if (options.params instanceof Array) {
    var promises = options.params.map(buildPromise);
    return _promise2.default.all(promises).then(function (responses) {
      return responses.map(validateHttpStatus);
    }).then(function (responses) {
      return responses.map(function (res) {
        return handleResponse(res, options);
      });
    });
  }

  return buildPromise(options.params).then(validateHttpStatus).then(function (res) {
    return handleResponse(res, options);
  });
}

exports.default = function (options) {
  return _promise2.default.resolve(options).then(hasOptions).then(hasAuth).then(isAllowedType).then(hasRequiredParams).then(buildParams).then(fetchData);
};