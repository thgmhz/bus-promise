"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrivalForecastResponse;
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

var lines = function lines(_lines) {
  return _lines.map(function (line) {
    return {
      lineId: line.cl,
      displaySign: line.c,
      direction: line.sl,
      mainTerminal: line.lt0,
      secondaryTerminal: line.lt1,
      quantity: line.qv,
      vehicles: vehicles(line.vs)
    };
  });
};

function arrivalForecastResponse(stop) {
  if (!stop.p) {
    return {
      hour: stop.hr,
      stop: null
    };
  }

  return {
    hour: stop.hr,
    stop: {
      stopId: stop.p.cp,
      name: stop.p.np,
      lat: stop.p.py,
      lng: stop.p.px,
      lines: lines(stop.p.l)
    }
  };
}