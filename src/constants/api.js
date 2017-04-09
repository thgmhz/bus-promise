export default {
  endpoint: 'http://api.olhovivo.sptrans.com.br/v0',
  auth: {
    route: '/login/autenticar',
    param: 'token'
  },
  linhas: {
    route: '/linha/buscar',
    param: 'termosBusca',
    libParam: 'term'
  },
  paradas: {
    route: '/parada/buscar',
    param: 'termosBusca',
    libParam: 'term'
  },
  paradasPorLinha: {
    route: '/parada/buscarParadasPorLinha',
    param: 'codigoLinha',
    libParam: 'code'
  }
}
