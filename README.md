<p align="center">
<img src="https://raw.githubusercontent.com/thiagommedeiros/bus-promise/master/bus.gif"
</p>
<h1 align="center">Bus Promise</h1>

<p align="center">
<a href="https://travis-ci.org/thiagommedeiros/bus-promise" target="_blank">
<img src="https://travis-ci.org/thiagommedeiros/bus-promise.svg?branch=master">
</a>
<a href="https://www.npmjs.com/package/bus-promise" target="_blank">
<img src="https://img.shields.io/npm/v/bus-promise.svg?style=flat-square">
</a>
<a href="https://github.com/thiagommedeiros/bus-promise/blob/master/LICENSE" target="_blank">
<img src="https://img.shields.io/github/license/mashape/apistatus.svg">
</a>
</p>

<p align="center">
Busca informações em tempo real da frota de ônibus da SPTrans na cidade de São Paulo.
</p>

## Sobre
A SPtrans disponibiliza uma API para consulta de alguns dados, porém outros dados estão disponíveis somente em arquivos `.csv` que seguem a especificação GTFS (General Transit Feed Specification). O **bus-promise** é uma biblioteca *Javascript (client-side e server-side)* feita para facilitar o uso da API e dos arquivos GTFS da SPTrans.

## Como funciona
O **bus-promise** faz requisições na API da SPTrans e no [bus-server](https://github.com/thiagommedeiros/bus-server), um serviço complementar da biblioteca que está hospedado no **heroku** e responde com os dados dos arquivos GTFS. O **bus-server** também é um auxiliar para requisições feitas pelo browser, dado que a API da SPTrans não oferece suporte a especificação CORS. Isso permite a biblioteca funcionar tanto no *client-side* quanto no *server-side*.


## Como utilizar

### Instalação
``` bash
$ npm install --save bus-promise
```

##### Node.js
``` js
import bus from 'bus-promise'
```

##### Browser
Você pode instalar o **bus-promise** via `npm`. Ou se preferir pode copiar o script [clicando aqui](https://github.com/thiagommedeiros/bus-promise/blob/master/build/browser/bus-promise.min.js). Os métodos estarão acessíveis através da variável global `bus`.

### Token

A API da SPTrans exige autenticação com um `token` que você pode obter ao  se cadastrar pelo link: http://www.sptrans.com.br/desenvolvedores/.

## Autenticação
O método `auth()` recebe um `token` e retorna uma `Promise` com as `credentials`.

``` js
import bus from 'bus-promise'

bus.auth('SEU_TOKEN_AQUI')
  .then(console.log)
```

## O método find()

Este é o principal método da biblioteca, você deve usá-lo para realizar buscas pelos seguintes tipos de dados:

- [Linhas](#linhas)
- [Trajeto](#trajeto)
- [Paradas](#paradas)
- [Paradas por linha](#paradas-por-linha)
- [Corredores](#corredores)
- [Paradas por corredor](#paradas-por-corredor)
- [Posição dos veículos](#posição-dos-veículos)
- [Previsão de chegada](#previsão-de-chegada)
- [Previsão da linha](#previsão-da-linha)
- [Previsão da parada](#previsão-da-parada)

#### Linhas
O tipo `linhas` possibilita a consulta pelas linhas de ônibus da cidade de São Paulo.

Aceita o nome da linha ou letreiro. O valor deve ser passado pelo parâmetro `termosBusca` como uma `string`:
``` js
import bus from 'bus-promise'

bus.auth('SEU_TOKEN_AQUI')
  .then(encontrarLinhas)

function encontrarLinhas (auth) {
  bus.find({
    auth,
    tipo: 'linhas',
    termosBusca: 'Term. Lapa'
  }).then(console.log)
}
```
##### Exemplo de resposta
``` js
[{
    CodigoLinha: 34022,
    CodigoTrajeto: 63468,
    Circular: false,
    Letreiro: '8004',
    Sentido: 2,
    Tipo: 10,
    DenominacaoTPTS: 'TERM. LAPA',
    DenominacaoTSTP: 'STA. MÔNICA',
    Informacoes: null
}]
```
Para obter todas as linhas:

``` js
bus.find({
  auth,
  tipo: 'linhas',
  termosBusca: '*'
}).then(console.log)
```

#### Trajeto
O tipo `trajeto` retorna uma lista com a latitude e longitude de cada rua que o ônibus passa.

Aceita o código do trajeto. O valor deve ser passado pelo parâmetro `codigoTrajeto` como `number`:

``` js
bus.find({
  auth,
  tipo: 'trajeto',
  codigoTrajeto: 63468
}).then(console.log)
```
##### Exemplo de resposta
``` js
[{
    shape_id: '63468',
    shape_pt_lat: '-23.516524',
    shape_pt_lon: '-46.725786',
    shape_pt_sequence: '81',
    shape_dist_traveled: '3637.9119'
}]
```

#### Paradas
O tipo `paradas` possibilita a consulta pelos pontos de parada da cidade de São Paulo.

Aceita o nome da parada ou o endereço de localização. O valor deve ser passado pelo parâmetro `termosBusca` como uma `string` ou um `array` de `strings`:

``` js
//passando string
bus.find({
  auth,
  tipo: 'paradas',
  termosBusca: 'Av. Mutinga'
}).then(console.log)

//passando array
bus.find({
  auth,
  tipo: 'paradas',
  termosBusca: ['Av. Mutinga', 'Av. Faria Lima', 'Av. Paulista']
}).then(console.log)
```
##### Exemplo de resposta
``` js
[{
    CodigoParada: 260015039,
    Nome: 'PAULISTA B/C',
    Endereco: 'AV PAULISTA/ AV REBOUCAS',
    Latitude: -23.555883,
    Longitude: -46.66306
}]
```

#### Paradas por linha
O tipo `paradasPorLinha` realiza uma busca por todos os pontos de parada atendidos por uma determinada linha.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `codigoLinha` como um `number` ou um `array` de `numbers`:

``` js
//passando number
bus.find({
  auth,
  tipo: 'paradasPorLinha',
  codigoLinha: 34041
}).then(console.log)

//passando array
bus.find({
  auth,
  tipo: 'paradas',
  codigoLinha: [34041, 34042, 34043]
}).then(console.log)
```
##### Exemplo de resposta
``` js
[{
    CodigoParada: 480014608,
    Nome: 'TIBERIO C/B',
    Endereco: 'R TIBERIO/ R MENFIS',
    Latitude: -23.522875,
    Longitude: -46.688219
}]
```

#### Corredores

O tipo `corredores` realiza uma busca por todos os corredores de ônibus da cidade de São Paulo.

``` js
bus.find({
  auth,
  tipo: 'corredores'    
}).then(console.log)
```
##### Exemplo de resposta
``` js
[{
    CodCot: 0,
    CodCorredor: 8,
    Nome: 'Campo Limpo'
}]
```

#### Paradas por corredor
O tipo `paradasPorCorredor` retorna a lista detalhada de todas as paradas que compõem um determinado corredor.

Aceita o código do corredor. O valor deve ser passado pelo parâmetro `codigoCorredor` como um `number` ou um `array` de `numbers`:

``` js
//passando number
bus.find({
  auth,
  tipo: 'paradasPorCorredor',
  codigoCorredor: 8
}).then(console.log)

//passando array
bus.find({
  auth,
  tipo: 'paradasPorCorredor',
  codigoCorredor: [8, 9]
}).then(console.log)
```
##### Exemplo de resposta
``` js
[{
    CodigoParada: 120011367,
    Nome: 'TRES IRMAOS C/B',
    Endereco: 'R JOSE JANNARELLI/ R TRES IRMAOS',
    Latitude: -23.584817,
    Longitude: -46.719021
}]
```

#### Posição dos veículos
O tipo `posicaoVeiculos` retorna a posição exata de cada veículo de qualquer linha de ônibus da SPTrans.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `codigoLinha` como um `number` ou um `array` de `numbers`:

``` js
//passando number
bus.find({
  auth,
  tipo: 'posicaoVeiculos',
  codigoLinha: 34041
}).then(console.log)

//passando array
bus.find({
  auth,
  tipo: 'posicaoVeiculos',
  codigoLinha: [34041, 34042]
}).then(console.log)
```

#### Previsão de chegada
O tipo `previsaoChegada` retorna a previsão de chegada de cada veículo de uma determinada linha e de um determinado ponto de parada, além da localização exata de cada veículo que constar na cadeia de previsões.

Aceita o código da parada e o código da linha. O valor deve ser passado pelos parâmetros `codigoParada` e `codigoLinha` como um `number`:

``` js
bus.find({
  auth,
  tipo: 'previsaoChegada',
  codigoParada: 260015039,
  codigoLinha: 34041
}).then(console.log)
```
#### Previsão da linha
O tipo `previsaoLinha` retorna uma lista com a previsão de chegada de cada um dos veículos da linha informada em todos os pontos de parada aos quais que ela atende.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `codigoLinha` como um `number` ou um `array` de `numbers`:

``` js
//passando number
bus.find({
  auth,
  tipo: 'previsaoLinha',
  codigoLinha: 34041
}).then(console.log)

//passando array
bus.find({
  auth,
  tipo: 'previsaoLinha',
  codigoLinha: [34041, 34042]
}).then(console.log)
```
#### Previsão da parada
O tipo `previsaoParada` retorna uma lista com a previsão de chegada dos veículos de cada uma das linhas que atendem ao ponto de parada informado.

Aceita o código da parada. O valor deve ser passado pelo parâmetro `codigoParada` como um `number` ou um `array` de `numbers`:

``` js
//passando number
bus.find({
  auth,
  tipo: 'previsaoParada',
  codigoParada: 260015039
}).then(console.log)

//passando array
bus.find({
  auth,
  tipo: 'previsaoParada',
  codigoParada: [260015039, 260015038]
}).then(console.log)
```

## Como contribuir
Para contribuir com o projeto, [clique aqui](https://github.com/thiagommedeiros/bus-promise/blob/master/CONTRIBUTING.md).

## Changelog
Para verificar o changelog, [clique aqui](https://github.com/thiagommedeiros/bus-promise/blob/master/CHANGELOG.md).

## Autor

| [<img src="https://avatars0.githubusercontent.com/u/19213244?v=3&s=115"><br><sub>@thiagommedeiros</sub>](https://github.com/thiagommedeiros) |
| :---: |
