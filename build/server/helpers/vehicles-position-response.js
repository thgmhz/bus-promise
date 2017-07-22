"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = vehiclesPositionResponse;
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

function vehiclesPositionResponse(vehicles) {
  if (!vehicles.l.length) {
    return {
      hour: vehicles.hr,
      lines: null
    };
  }

  return {
    hour: vehicles.hr,
    lines: lines(vehicles.l)
  };
}