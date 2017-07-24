'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stopsResponse;
function stopsResponse(data, terms) {
  if (terms === '*') {
    return data.map(function (stop) {
      return {
        stopId: stop.stop_id,
        name: stop.stop_name,
        address: stop.stop_desc,
        lat: stop.stop_lat,
        lng: stop.stop_lon
      };
    });
  }

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