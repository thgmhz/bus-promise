"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = arrivalForecastResponse;
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

var lines = function lines(data) {
  return data.map(function (line) {
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

function arrivalForecastResponse(data) {
  if (!data.p) {
    return {
      hour: data.hr,
      stop: null
    };
  }

  return {
    hour: data.hr,
    stop: {
      stopId: data.p.cp,
      name: data.p.np,
      lat: data.p.py,
      lng: data.p.px,
      lines: lines(data.p.l)
    }
  };
}