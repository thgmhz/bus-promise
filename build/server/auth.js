'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isBrowser = typeof window !== 'undefined';

var handleError = function handleError(err) {
  throw new Error(err);
};

var handleResponse = function handleResponse(res) {
  if (isBrowser) return res.data;
  return res;
};

var checkIfHasToken = function checkIfHasToken(token) {
  return token || handleError('O token é obrigatório para autenticação.');
};

var validateHttpStatus = function validateHttpStatus(res) {
  res.status === 200 || handleError('Erro ao se conectar com o serviço da SPTrans.');
  return res;
};

var validateToken = function validateToken(res) {
  res.data || handleError('Token inválido.');
  return res;
};

var setCredentials = function setCredentials(res) {
  if (isBrowser) return res.auth[0];
  return res.headers['set-cookie'][0];
};

var fetchData = function fetchData(token) {
  var url = _constants.API.endpoint + _constants.API.auth.route;

  if (isBrowser) {
    url = _constants.API.heroku + '/auth';
  }

  var config = {
    method: 'post',
    url: url,
    params: { token: token }
  };

  return (0, _axios2.default)(config).then(handleResponse).then(validateHttpStatus).then(validateToken).then(setCredentials);
};

exports.default = function (token) {
  return Promise.resolve(token).then(checkIfHasToken).then(fetchData).catch(handleError);
};