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
  options || handleError('O método "find" deve receber um objeto com opções.');
  return options;
}

function hasAuth(options) {
  options.auth || handleError('O método "find" deve receber o parâmetro "auth".');
  return options;
}

function isAllowedType(options) {
  options.tipo in _constants.API || handleError('O "tipo" "' + options.tipo + '" n\xE3o existe.');
  return options;
}

function hasRequiredParams(options) {
  var requiredParams = _constants.API[options.tipo].required;
  if (!requiredParams) return options;

  var checkParam = function checkParam(param) {
    return !(param in options);
  };
  var missingParams = requiredParams.filter(checkParam);
  missingParams.length === 0 || handleError('Par\xE2metro(s) obrigat\xF3rio(s): "' + missingParams + '".');

  return options;
}

function buildParams(options) {
  var requiredParams = _constants.API[options.tipo].required;
  if (!requiredParams) return options;

  var build = function build(acc, cur) {
    var paramValue = options[cur];
    if (paramValue instanceof Array) {
      return paramValue.map(function (value) {
        return (0, _defineProperty3.default)({}, cur, value);
      });
    }
    acc[cur] = paramValue;
    return acc;
  };

  var params = requiredParams.reduce(build, {});
  return (0, _assign2.default)(options, { params: params });
}

function validateHttpStatus(res) {
  res.status === 200 || handleError('Erro ' + res.status + ' ao se conectar com o servi\xE7o da SPTrans.');
  return res;
}

function handleResponse(res, options) {
  if (options.tipo === 'linhas' && options.params.termosBusca !== '*') {
    return (0, _helpers.buildLinhasResponse)(res.data);
  }
  return res.data;
}

function fetchData(options) {
  var buildPromise = function buildPromise(params) {
    var url = _constants.API.sptrans + _constants.API[options.tipo].route;
    var headers = {
      Cookie: options.auth
    };

    if (isBrowser && params) {
      headers = null;
      url = _constants.API.server + '/find';
      (0, _assign2.default)(params, {
        auth: options.auth,
        route: _constants.API[options.tipo].route
      });
    }

    if (options.tipo === 'trajeto') {
      headers = null;
      url = _constants.API.server + '/shapes/' + options.codigoTrajeto;
    }

    if (options.tipo === 'linhas' && params.termosBusca === '*') {
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
    return _promise2.default.all(promises).then(function (res) {
      return res.map(validateHttpStatus);
    }).then(function (res) {
      return res.map(handleResponse);
    });
  }

  return buildPromise(options.params).then(validateHttpStatus).then(function (res) {
    return handleResponse(res, options);
  });
}

exports.default = function (options) {
  return _promise2.default.resolve(options).then(hasOptions).then(hasAuth).then(isAllowedType).then(hasRequiredParams).then(buildParams).then(fetchData);
};