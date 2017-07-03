"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stopsResponse;
function stopsResponse(stops) {
  return stops.map(function (stop) {
    return {
      stopId: stop.CodigoParada,
      name: stop.Nome,
      address: stop.Endereco,
      lat: stop.Latitude,
      lng: stop.Longitude
    };
  });
}