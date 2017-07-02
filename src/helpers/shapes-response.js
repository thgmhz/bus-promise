export default function buildShapesResponse (shapes) {
  return shapes.map(shape => ({
    shapeId: shape.shape_id,
    lat: shape.shape_pt_lat,
    lng: shape.shape_pt_lon,
    sequence: shape.shape_pt_sequence,
    traveled: shape.shape_dist_traveled
  }))
}
