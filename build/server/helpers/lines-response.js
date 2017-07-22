'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = linesResponse;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linesResponse(lines) {
  var buildPromise = function buildPromise(tripId) {
    return (0, _axios2.default)({
      method: 'get',
      url: _constants.API.server + '/trips/' + tripId
    });
  };

  var parseShapeId = function parseShapeId(res) {
    return res.map(function (item) {
      return item.data[0] ? item.data[0].shape_id : null;
    });
  };

  var getShapesIds = function getShapesIds(tripsIds) {
    var promises = tripsIds.map(buildPromise);
    return _promise2.default.all(promises).then(parseShapeId);
  };

  var tripsIds = lines.map(function (item) {
    return item.lt + '-' + item.tl + '-' + (item.sl - 1);
  });

  return getShapesIds(tripsIds).then(function (shapesIds) {
    return lines.map(function (item, key) {
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
  });
}