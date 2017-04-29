'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = typeof window !== 'undefined';

function handleError(err) {
  throw new Error(err);
}

function handleResponse(res) {
  if (isBrowser) return res.data;
  return res;
}

function checkIfHasToken(token) {
  token || handleError('O token é obrigatório para autenticação.');
  return token;
}

function validateHttpStatus(res) {
  res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.');
  return res;
}

function validateToken(res) {
  res.data || handleError('Token inválido.');
  return res;
}

function setCredentials(res) {
  if (isBrowser) return res.auth[0];
  return res.headers['set-cookie'][0];
}

function fetchData(token) {
  var url = _constants.API.sptrans + _constants.API.auth.route;

  if (isBrowser) {
    url = _constants.API.server + '/auth';
  }

  var config = {
    method: 'post',
    url: url,
    params: { token: token }
  };

  return (0, _axios2.default)(config).then(handleResponse).then(validateHttpStatus).then(validateToken).then(setCredentials);
}

exports.default = function (token) {
  return _promise2.default.resolve(token).then(checkIfHasToken).then(fetchData);
};