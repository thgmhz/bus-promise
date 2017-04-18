<h1 align="center">SPTrans Promise</h1>

<p align="center">
<a href="https://travis-ci.org/thiagommedeiros/sptrans-promise" target="_blank"> 
<img src="https://travis-ci.org/thiagommedeiros/sptrans-promise.svg?branch=master">
</a>
<a href="https://www.npmjs.com/package/sptrans-promise" target="_blank">
<img src="https://img.shields.io/npm/v/sptrans-promise.svg?style=flat-square">
</a>
<a href="https://github.com/thiagommedeiros/sptrans-promise/blob/master/LICENSE" target="_blank">
<img src="https://img.shields.io/github/license/mashape/apistatus.svg">
</a>
</p>

<p align="center">
Busca informações em tempo real da frota de ônibus da SPTrans na cidade de São Paulo.
</p>

<br>

## Sobre
O **sptrans-promise** é uma biblioteca *Javascript (client-side e server-side)* feita para facilitar o acesso a API da SPTrans que disponibiliza dados em tempo real da frota de ônibus da cidade de São Paulo.


## Como utilizar

### Instalação
``` bash
$ npm install --save sptrans-promise
```

#### Node.js
``` js
import sptrans from 'sptrans-promise'
```

#### Browser
Você pode instalar o **sptrans-promise** via `npm` e então importar o script através do caminho:
`node_modules/sptrans-promise/build/browser/sptrans-promise.min.js`.

Ou se preferir pode copiar o script minificado, [clique aqui](https://github.com/thiagommedeiros/sptrans-promise/blob/master/build/browser/sptrans-promise.min.js).

### Token

A API da SPTrans exige autenticação com um `token` que você pode obter ao  se cadastrar pelo link: http://www.sptrans.com.br/desenvolvedores/.

## Autenticação
O método `auth()` recebe um `token` e retorna uma `Promise` com as `credentials`.

``` js
import sptrans from 'sptrans-promise'

sptrans.auth('SEU_TOKEN_AQUI')
  .then(console.log)
```

## O método find()

Este é o principal método da biblioteca, você deve usá-lo para realizar buscas pelos seguintes tipos de dados:

- [Linhas](#linhas)
- [Paradas](#paradas)
- [Paradas por linha](#paradas-por-linha)
- [Corredores](#corredores)
- [Paradas por corredor](#paradas-por-corredor)
- [Posição dos veículos](#posicao-dos-veiculos)
- [Previsão de chegada](#previsao-de-chegada)
- [Previsão da linha](#previsao-da-linha)
- [Previsão da parada](#previsao-da-parada)

#### Linhas
O tipo `linhas` possibilita a consulta pelas linhas de ônibus da cidade de São Paulo.

Aceita o nome da linha ou letreiro. O valor deve ser passado pelo parâmetro `termosBusca` como uma `string`:
``` js
import sptrans from 'sptrans-promise'

const encontrarLinhas = auth => {
  sptrans.find({
    auth,
    tipo: 'linhas',
    termosBusca: 'Term. Lapa'
  }).then(console.log)
}

sptrans.auth('SEU_TOKEN_AQUI')
  .then(encontrarLinhas)
```
O parâmetro `termosBusca` também aceita um `array` de `strings` para buscar várias linhas ao mesmo tempo. Exemplo:

``` js
sptrans.find({
  auth,
  tipo: 'linhas',
  termosBusca: ['Term. Lapa', 'Term. Pirituba']
}).then(console.log)
```

#### Paradas
O tipo `paradas` possibilita a consulta pelos pontos de parada da cidade de São Paulo.

Aceita o nome da parada ou o endereço de localização. O valor deve ser passado pelo parâmetro `termosBusca` como uma `string` ou um `array` de `strings`:

``` js
//passando string
sptrans.find({
  auth,
  tipo: 'paradas',
  termosBusca: 'Av. Mutinga'
}).then(console.log)

//passando array
sptrans.find({
  auth,
  tipo: 'paradas',
  termosBusca: ['Av. Mutinga', 'Av. Faria Lima', 'Av. Paulista']
}).then(console.log)
```

#### Paradas por linha
O tipo `paradasPorLinha` realiza uma busca por todos os pontos de parada atendidos por uma determinada linha.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `codigoLinha` como um `integer` ou um `array` de `integers`:

``` js
//passando integer
sptrans.find({
  auth,
  tipo: 'paradasPorLinha',
  codigoLinha: 34041
}).then(console.log)

//passando array
sptrans.find({
  auth,
  tipo: 'paradas',
  codigoLinha: [34041, 34042, 34043]
}).then(console.log)
```

#### Corredores

O tipo `corredores` realiza uma busca por todos os corredores de ônibus da cidade de São Paulo.

``` js
sptrans.find({
  auth,
  tipo: 'corredores'    
}).then(console.log)
```

#### Paradas por corredor
O tipo `paradasPorCorredor` retorna a lista detalhada de todas as paradas que compõem um determinado corredor.

Aceita o código do corredor. O valor deve ser passado pelo parâmetro `codigoCorredor` como um `integer` ou um `array` de `integers`:

``` js
//passando integer
sptrans.find({
  auth,
  tipo: 'paradasPorCorredor',
  codigoCorredor: 8
}).then(console.log)

//passando array
sptrans.find({
  auth,
  tipo: 'paradasPorCorredor',
  codigoCorredor: [8, 9]
}).then(console.log)
```

#### Posição dos veículos
O tipo `posicaoVeiculos` retorna a posição exata de cada veículo de qualquer linha de ônibus da SPTrans.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `codigoLinha` como um `integer` ou um `array` de `integers`:

``` js
//passando integer
sptrans.find({
  auth,
  tipo: 'posicaoVeiculos',
  codigoLinha: 34041
}).then(console.log)

//passando array
sptrans.find({
  auth,
  tipo: 'posicaoVeiculos',
  codigoLinha: [34041, 34042]
}).then(console.log)
```

#### Previsão de chegada
O tipo `previsaoChegada` retorna a previsão de chegada de cada veículo de uma determinada linha e de um determinado ponto de parada, além da localização exata de cada veículo que constar na cadeia de previsões.

Aceita o código da parada e o código da linha. O valor deve ser passado pelos parâmetros `codigoParada` e `codigoLinha` como um `integer`:

``` js
sptrans.find({
  auth,
  tipo: 'previsaoChegada',
  codigoParada: 260015039,
  codigoLinha: 34041
}).then(console.log)
```
#### Previsão da linha
O tipo `previsaoLinha` retorna uma lista com a previsão de chegada de cada um dos veículos da linha informada em todos os pontos de parada aos quais que ela atende.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `codigoLinha` como um `integer` ou um `array` de `integers`:

``` js
//passando integer
sptrans.find({
  auth,
  tipo: 'previsaoLinha',
  codigoLinha: 34041
}).then(console.log)

//passando array
sptrans.find({
  auth,
  tipo: 'previsaoLinha',
  codigoLinha: [34041, 34042]
}).then(console.log)
```
#### Previsão da parada
O tipo `previsaoParada` retorna uma lista com a previsão de chegada dos veículos de cada uma das linhas que atendem ao ponto de parada informado.

Aceita o código da parada. O valor deve ser passado pelo parâmetro `codigoParada` como um `integer` ou um `array` de `integers`:

``` js
//passando integer
sptrans.find({
  auth,
  tipo: 'previsaoParada',
  codigoParada: 260015039
}).then(console.log)

//passando array
sptrans.find({
  auth,
  tipo: 'previsaoParada',
  codigoParada: [260015039, 260015038]
}).then(console.log)
```

## Como contribuir
Para contribuir com o projeto, [clique aqui](https://github.com/thiagommedeiros/sptrans-promise/blob/master/CONTRIBUTING.md).

## Autor

| [<img src="https://avatars0.githubusercontent.com/u/19213244?v=3&s=115"><br><sub>@thiagommedeiros</sub>](https://github.com/thiagommedeiros) |
| :---: |
