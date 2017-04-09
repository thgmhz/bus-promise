export default {
  endpoint: 'http://api.olhovivo.sptrans.com.br/v0',
  auth: {
    route: '/login/autenticar',
    param: 'token'
  },
  linhas: {
    route: '/linha/buscar',
    param: 'termosBusca'
  },
  paradas: {
    route: '/parada/buscar',
    param: 'termosBusca'
  }
}
