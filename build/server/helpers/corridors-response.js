"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = corridorsResponse;
function corridorsResponse(corridors) {
  return corridors.map(function (corridor) {
    return {
      corridorId: corridor.cc,
      name: corridor.nc
    };
  });
}