export default function corridorsResponse (corridors) {
  return corridors.map(corridor => ({
    corridorId: corridor.cc,
    name: corridor.nc
  }))
}
