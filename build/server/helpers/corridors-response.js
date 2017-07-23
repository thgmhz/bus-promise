"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = corridorsResponse;
function corridorsResponse(data) {
  return data.map(function (corridor) {
    return {
      corridorId: corridor.cc,
      name: corridor.nc
    };
  });
}