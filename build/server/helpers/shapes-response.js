"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildShapesResponse;
function buildShapesResponse(data) {
  return data.map(function (shape) {
    return {
      shapeId: shape.shape_id,
      lat: shape.shape_pt_lat,
      lng: shape.shape_pt_lon,
      sequence: shape.shape_pt_sequence,
      traveled: shape.shape_dist_traveled
    };
  });
}