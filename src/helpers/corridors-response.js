export default function corridorsResponse (data) {
  return data.map(corridor => ({
    corridorId: corridor.cc,
    name: corridor.nc
  }))
}
