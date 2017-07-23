"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lineForecastResponse;
var vehicles = function vehicles(data) {
  return data.map(function (vehicle) {
    return {
      prefix: vehicle.p,
      accessible: vehicle.a,
      hour: vehicle.t,
      lat: vehicle.py,
      lng: vehicle.px
    };
  });
};

var stops = function stops(data) {
  return data.map(function (stop) {
    return {
      stopId: stop.cp,
      name: stop.np,
      lat: stop.py,
      lng: stop.px,
      vehicles: vehicles(stop.vs)
    };
  });
};

function lineForecastResponse(data) {
  if (!data.ps) {
    return {
      hour: data.hr,
      stops: null
    };
  }

  return {
    hour: data.hr,
    stops: stops(data.ps)
  };
}