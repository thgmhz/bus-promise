'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(linhas) {
    var buildPromise, getShapesIds, tripsIds, shapesIds, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buildPromise = function buildPromise(tripId) {
              return (0, _axios2.default)({
                method: 'get',
                url: _constants.API.heroku + '/trips/' + tripId
              });
            };

            getShapesIds = function getShapesIds(tripsIds) {
              var promises = tripsIds.map(buildPromise);
              return _promise2.default.all(promises).then(function (res) {
                return res.map(function (item) {
                  return item.data[0].shape_id;
                });
              });
            };

            tripsIds = linhas.map(function (item) {
              return item.Letreiro + '-' + item.Tipo + '-' + (item.Sentido - 1);
            });
            _context.next = 5;
            return getShapesIds(tripsIds);

          case 5:
            shapesIds = _context.sent;
            response = linhas.map(function (item, key) {
              return {
                CodigoLinha: item.CodigoLinha,
                CodigoTrajeto: shapesIds[key],
                Circular: item.Circular,
                Letreiro: item.Letreiro,
                Sentido: item.Sentido,
                Tipo: item.Tipo,
                DenominacaoTPTS: item.DenominacaoTPTS,
                DenominacaoTSTP: item.DenominacaoTSTP,
                Informacoes: item.Informacoes
              };
            });
            return _context.abrupt('return', response);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function buildLinhasResponse(_x) {
    return _ref.apply(this, arguments);
  }

  return buildLinhasResponse;
}();