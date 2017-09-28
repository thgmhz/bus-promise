'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = linesDirectionResponse;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function linesDirectionResponse(data) {
  return data.map(function (line) {
    return {
      lineId: line.cl,
      circular: line.lc,
      displaySign: line.lt,
      direction: line.sl,
      type: line.tl,
      mainTerminal: line.tp,
      secondaryTerminal: line.ts
    };
  });
}
