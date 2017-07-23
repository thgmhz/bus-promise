"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stopsResponse;
function stopsResponse(data) {
  return data.map(function (stop) {
    return {
      stopId: stop.cp,
      name: stop.np,
      address: stop.ed,
      lat: stop.py,
      lng: stop.px
    };
  });
}