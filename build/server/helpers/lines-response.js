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
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(lines) {
    var buildPromise, parseShapeId, getShapesIds, tripsIds, shapesIds, response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            buildPromise = function buildPromise(tripId) {
              return (0, _axios2.default)({
                method: 'get',
                url: _constants.API.server + '/trips/' + tripId
              });
            };

            parseShapeId = function parseShapeId(res) {
              return res.map(function (item) {
                return item.data[0] ? item.data[0].shape_id : null;
              });
            };

            getShapesIds = function getShapesIds(tripsIds) {
              var promises = tripsIds.map(buildPromise);
              return _promise2.default.all(promises).then(parseShapeId);
            };

            tripsIds = lines.map(function (item) {
              return item.lt + '-' + item.tl + '-' + (item.sl - 1);
            });
            _context.next = 6;
            return getShapesIds(tripsIds);

          case 6:
            shapesIds = _context.sent;
            response = lines.map(function (item, key) {
              return {
                lineId: item.cl,
                shapeId: shapesIds[key],
                circular: item.lc,
                displaySign: item.lt,
                direction: item.sl,
                type: item.tl,
                mainTerminal: item.tp,
                secondaryTerminal: item.ts
              };
            });
            return _context.abrupt('return', response);

          case 9:
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