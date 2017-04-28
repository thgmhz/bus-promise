export default {
  localhost: 'http://localhost:8888',
  sptrans: 'http://api.olhovivo.sptrans.com.br/v0',
  server: 'http://sample-env.yx3tdkimgd.us-west-2.elasticbeanstalk.com',
  auth: {
    route: '/login/autenticar',
    required: ['token']
  },
  linhas: {
    route: '/linha/buscar',
    required: ['termosBusca']
  },
  trajeto: {
    route: '/shapes',
    required: ['codigoTrajeto']
  },
  paradas: {
    route: '/parada/buscar',
    required: ['termosBusca']
  },
  paradasPorLinha: {
    route: '/parada/buscarParadasPorLinha',
    required: ['codigoLinha']
  },
  corredores: {
    route: '/corredor'
  },
  paradasPorCorredor: {
    route: '/parada/buscarParadasPorCorredor',
    required: ['codigoCorredor']
  },
  posicaoVeiculos: {
    route: '/posicao',
    required: ['codigoLinha']
  },
  previsaoChegada: {
    route: '/previsao',
    required: ['codigoParada', 'codigoLinha']
  },
  previsaoLinha: {
    route: '/previsao/linha',
    required: ['codigoLinha']
  },
  previsaoParada: {
    route: '/previsao/parada',
    required: ['codigoParada']
  }
}
