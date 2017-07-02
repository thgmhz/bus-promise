"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lineForecastResponse;
var vehicles = function vehicles(_vehicles) {
  return _vehicles.map(function (vehicle) {
    return {
      prefix: vehicle.p,
      accessible: vehicle.a,
      hour: vehicle.ta,
      lat: vehicle.py,
      lng: vehicle.px
    };
  });
};

var stops = function stops(_stops) {
  return _stops.map(function (stop) {
    return {
      stopId: stop.cp,
      name: stop.np,
      lat: stop.py,
      lng: stop.px,
      vehicles: vehicles(stop.vs)
    };
  });
};

function lineForecastResponse(line) {
  if (!line.ps) {
    return {
      hour: line.hr,
      stops: null
    };
  }

  return {
    hour: line.hr,
    stops: stops(line.ps)
  };
}