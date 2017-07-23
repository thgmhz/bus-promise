"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = vehiclesPositionResponse;
var vehicles = function vehicles(data) {
  return data.map(function (vehicle) {
    return {
      prefix: vehicle.p,
      accessible: vehicle.a,
      hour: vehicle.ta,
      lat: vehicle.py,
      lng: vehicle.px
    };
  });
};

function vehiclesPositionResponse(data) {
  if (!data.vs.length) {
    return {
      hour: data.hr,
      vehicles: null
    };
  }

  return {
    hour: data.hr,
    vehicles: vehicles(data.vs)
  };
}