export default {
  sptrans: 'http://api.olhovivo.sptrans.com.br/v2.1',
  server: 'https://busserver.herokuapp.com',
  auth: {
    route: '/login/autenticar',
    required: ['token']
  },
  lines: {
    route: '/linha/buscar',
    required: ['terms'],
    proxyParams: {
      terms: 'termosBusca'
    }
  },
  shapes: {
    route: '/shapes',
    required: ['shapeId'],
    proxyParams: {
      shapeId: 'codigoTrajeto'
    }
  },
  stops: {
    route: '/parada/buscar',
    required: ['terms'],
    proxyParams: {
      terms: 'termosBusca'
    }
  },
  stopsByLine: {
    route: '/parada/buscarParadasPorLinha',
    required: ['lineId'],
    proxyParams: {
      lineId: 'codigoLinha'
    }
  },
  corridors: {
    route: '/corredor'
  },
  stopsByCorridor: {
    route: '/parada/buscarParadasPorCorredor',
    required: ['corridorId'],
    proxyParams: {
      corridorId: 'codigoCorredor'
    }
  },
  vehiclesPosition: {
    route: '/posicao/linha',
    required: ['lineId'],
    proxyParams: {
      lineId: 'codigoLinha'
    }
  },
  arrivalForecast: {
    route: '/previsao',
    required: ['stopId', 'lineId'],
    proxyParams: {
      stopId: 'codigoParada',
      lineId: 'codigoLinha'
    }
  },
  lineForecast: {
    route: '/previsao/linha',
    required: ['lineId'],
    proxyParams: {
      lineId: 'codigoLinha'
    }
  },
  stopForecast: {
    route: '/previsao/parada',
    required: ['stopId'],
    proxyParams: {
      stopId: 'codigoParada'
    }
  },
  linesDirection: {
    route: '/linha/buscarLinhaSentido',
    required: ['terms', 'direction'],
    proxyParams: {
      terms: 'termosBusca',
      direction: 'sentido'
    }
  },
  companies: {
    route: '/empresa'
  }
}
