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
O **bus-promise** faz requisições na API da SPTrans e no [bus-server](https://github.com/thiagommedeiros/bus-server), um serviço complementar da biblioteca que está hospedado no **heroku** e responde com os dados dos arquivos GTFS. Dado que a API da SPTrans não oferece suporte a especificação CORS, o **bus-server** também é um auxiliar para requisições feitas pelo browser. Isso permite a biblioteca funcionar tanto no *client-side* quanto no *server-side*.


## Como utilizar

### Instalação
``` bash
$ npm install --save bus-promise
```

##### Node.js
``` js
import * as bus from 'bus-promise'
```

##### Browser
Você pode instalar o **bus-promise** via `npm`. Ou se preferir pode copiar o script [clicando aqui](https://github.com/thiagommedeiros/bus-promise/blob/master/build/browser/bus-promise.min.js). Os métodos estarão acessíveis através da variável global `bus`.

### Token

A API da SPTrans exige autenticação com um `token` que você pode obter ao  se cadastrar pelo link: http://www.sptrans.com.br/desenvolvedores/.

## Autenticação
O método `auth()` recebe um `token` e retorna uma `Promise` com as `credentials`.

``` js
import * as bus from 'bus-promise'

bus.auth('SEU_TOKEN_AQUI')
  .then(console.log)
```

## O método find()

Este é o principal método da biblioteca, você deve usá-lo para realizar buscas pelos seguintes tipos de dados:

- [Linhas (lines)](#linhas-lines)
- [Linhas por sentido (linesByDirection)](#linhas-por-sentido-linesbydirection)
- [Trajetos (shapes)](#trajetos-shapes)
- [Paradas (stops)](#paradas-stops)
- [Paradas por linha (stopsByLine)](#paradas-por-linha-stopsbylines)
- [Corredores (corridors)](#corredores-corridors)
- [Paradas por corredor (stopsByCorridor)](#paradas-por-corredor-stopsbycorridor)
- [Posição dos veículos (vehiclesPosition)](#posição-dos-veículos-vehiclesposition)
- [Previsão de chegada (arrivalForecast)](#previsão-de-chegada-arrivalforecast)
- [Previsão da linha (lineForecast)](#previsão-da-linha-lineforecast)
- [Previsão da parada (stopForecast)](#previsão-da-parada-stopforecast)
- [Empresas](#empresas-companies)

#### Linhas (lines)
O tipo `lines` possibilita a consulta pelas linhas de ônibus da cidade de São Paulo.

Aceita o nome da linha ou letreiro `displaySign`.
O valor deve ser passado pelo parâmetro `terms` como `string`:
``` js
import bus from 'bus-promise'

bus.auth('SEU_TOKEN_AQUI')
  .then(getLines)

function getLines (auth) {
  bus.find({
    auth,
    type: 'lines',
    terms: 'Term. Lapa'
  }).then(console.log)
}
```
Para obter todas as linhas:

``` js
bus.find({
  auth,
  type: 'lines',
  terms: '*'
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `lineId` | *integer* | Código identificador da linha. Este é um código identificador único de cada linha do sistema (por sentido de operação).
| `shapeId` | *integer* | Código identificador do trajeto. Este código deve ser usado para consultar o trajeto completo do ônibus através do tipo `shapes`.
| `circular` | *bool* |  Indica se uma linha opera no modo circular (sem um terminal secundário).
| `displaySign` | *string* | A primeira parte do letreiro numérico da linha.
| `direction` | *int* | A segunda parte do letreiro numérico da linha, que indica se a linha opera nos modos: *base (10), atendimento (21, 23, 32, 41)*.
| `type` | *int* | O sentido ao qual a linha atende, onde 1 significa do Terminal Principal (mainDestination) para Terminal Secundário (secondaryDestination) e 2 do Terminal Secundário para Terminal Principal.
| `mainTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Principal para Terminal Secundário.
| `secondaryTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal.

#### Linhas por sentido (linesByDirection)
O tipo `linesDirection` possibilita a consulta pelas linhas de ônibus filtrando pelo sentido.

Aceita o nome ou letreiro da linha e o sentido da linha
O valor deve ser passado pelos parâmetros `terms` como `string` e `direction` como `integer`. Os valores aceitos em `direction` são:

- 1: Terminal Principal para Terminal Secundário
- 2: Terminal Secundário para Terminal Principal

``` js
  bus.find({
    auth,
    type: 'linesDirection',
    terms: '8000',
    direction: 1
  }).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `lineId` | *integer* | Código identificador da linha. Este é um código identificador único de cada linha do sistema (por sentido de operação).
| `circular` | *bool* |  Indica se uma linha opera no modo circular (sem um terminal secundário).
| `displaySign` | *string* | A primeira parte do letreiro numérico da linha.
| `direction` | *int* | A segunda parte do letreiro numérico da linha, que indica se a linha opera nos modos: *base (10), atendimento (21, 23, 32, 41)*.
| `type` | *int* | O sentido ao qual a linha atende, onde 1 significa do Terminal Principal (mainDestination) para Terminal Secundário (secondaryDestination) e 2 do Terminal Secundário para Terminal Principal.
| `mainTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Principal para Terminal Secundário.
| `secondaryTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal.


#### Trajeto (shapes)
O tipo `shapes` retorna uma lista com a latitude e longitude de cada rua do trajeto do ônibus.

Aceita o código do trajeto. O valor deve ser passado pelo parâmetro `shapeId` como `integer`:

``` js
bus.find({
  auth,
  type: 'shapes',
  shapeId: 63468
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `shapeId` | *integer* | Código identificador do trajeto.
| `lat` | *string* |  Latitude daquele ponto do trajeto.
| `lng` | *string* | Longitude daquele ponto do trajeto.
| `sequence` | *string* | Número que indica a sequência de cada ponto do trajeto.

#### Paradas (stops)
O tipo `stops` possibilita a consulta pelos pontos de parada da cidade de São Paulo.

Aceita o nome da parada ou o endereço de localização. O valor deve ser passado pelo parâmetro `terms` como `string`:

``` js
bus.find({
  auth,
  type: 'stops',
  terms: 'Av. Mutinga'
}).then(console.log)
```
Para obter todas as paradas:

``` js
bus.find({
  auth,
  type: 'stops',
  terms: '*'
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `stopId` | *integer* | Código identificador da parada.
| `name` | *string* |  Nome da parada.
| `address` | *string* |  Endereço de localização da parada.
| `lat` | *string* | Informação de latitude da localização da parada.
| `lng` | *string* | Informação de longitude da localização da parada.


#### Paradas por linha (stopsByLine)
O tipo `stopsByLine` realiza uma busca por todos os pontos de parada atendidos por uma determinada linha.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `lineId` como `integer`:

``` js
bus.find({
  auth,
  type: 'stopsByLine',
  lineId: 34041
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `stopId` | *integer* | Código identificador da parada.
| `name` | *string* |  Nome da parada.
| `address` | *string* |  Endereço de localização da parada.
| `lat` | *string* | Informação de latitude da localização da parada.
| `lng` | *string* | Informação de longitude da localização da parada.

#### Corredores (corridors)

O tipo `corridors` realiza uma busca por todos os corredores de ônibus da cidade de São Paulo.

``` js
bus.find({
  auth,
  type: 'corridors'
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `corridorId` | *integer* | Código identificador do corredor.
| `name` | *string* |  Nome do corredor.

#### Paradas por corredor (stopsByCorridor)
O tipo `stopsByCorridor` retorna a lista detalhada de todas as paradas que compõem um determinado corredor.

Aceita o código do corredor. O valor deve ser passado pelo parâmetro `corridorId` como `integer`:

``` js
bus.find({
  auth,
  type: 'stopsByCorridor',
  corridorId: 8
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `stopId` | *integer* | Código identificador da parada.
| `name` | *string* |  Nome da parada.
| `address` | *string* |  Endereço de localização da parada.
| `lat` | *string* | Informação de latitude da localização da parada.
| `lng` | *string* | Informação de longitude da localização da parada.

#### Posição dos veículos (vehiclesPosition)
O tipo `vehiclesPosition` retorna a posição exata de cada veículo de qualquer linha de ônibus da SPTrans.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `lineId` como `integer`:

``` js
bus.find({
  auth,
  type: 'vehiclesPosition',
  lineId: 34041
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `hour` | *string* | Horário de referência em que as informações foram geradas.
| `lines` | *array* | Relação de linhas localizadas com os atributos abaixo:
| `lineId` | *string* |  Endereço de localização da parada.
| `displaySign` | *string* | Letreiro completo.
| `type` | *int* | O sentido ao qual a linha atende, onde **1** significa do Terminal Principal (mainDestination) para Terminal Secundário (secondaryDestination) e **2** do Terminal Secundário para Terminal Principal.
| `mainTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Principal para Terminal Secundário.
| `secondaryTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal.
| `quantity` | *integer* | Quantidade de veículos localizados.
| `vehicles` | *array* | Relação de veículos localizados com os atributos abaixo:
| `prefix` | *integer* | Prefixo do veículo.
| `accessible` | *bool* | Indica se o veículo é (true) ou não (false) acessível para pessoas com deficiência.
| `hour` | *string* | Indica o horário universal (UTC) em que a localização foi capturada. Essa informação está no padrão ISO 8601.
| `lat` | *string* | Informação de latitude da localização do veículo.
| `lng` | *string* | Informação de longitude da localização do veículo.

#### Previsão de chegada (arrivalForecast)
O tipo `arrivalForecast` retorna a previsão de chegada de cada veículo de uma determinada linha e de um determinado ponto de parada, além da localização exata de cada veículo que constar na cadeia de previsões.

Aceita o código da parada e o código da linha. O valor deve ser passado pelos parâmetros `stopId` e `lineId` como `integer`:

``` js
bus.find({
  auth,
  type: 'arrivalForecast',
  stopId: 260015039,
  lineId: 34041
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `hour` | *string* | Horário de referência em que as informações foram geradas.
| `stops` | *array* | Representa um ponto de parada com os atributos abaixo:
| `stopId` | *integer* | Código identificador da parada.
| `name` | *string* |  Nome da parada.
| `address` | *string* |  Endereço de localização da parada.
| `lat` | *string* | Informação de latitude da localização da parada.
| `lng` | *string* | Informação de longitude da localização da parada.
| `lines` | *array* | Relação de linhas localizadas com os atributos abaixo:
| `lineId` | *string* |  Endereço de localização da parada.
| `displaySign` | *string* | Letreiro completo.
| `type` | *int* | O sentido ao qual a linha atende, onde **1** significa do Terminal Principal (mainDestination) para Terminal Secundário (secondaryDestination) e **2** do Terminal Secundário para Terminal Principal.
| `mainTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Principal para Terminal Secundário.
| `secondaryTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal.
| `quantity` | *integer* | Quantidade de veículos localizados.
| `vehicles` | *array* | Relação de veículos localizados com os atributos abaixo:
| `prefix` | *integer* | Prefixo do veículo.
| `accessible` | *bool* | Indica se o veículo é (true) ou não (false) acessível para pessoas com deficiência.
| `hour` | *string* | Indica o horário universal (UTC) em que a localização foi capturada. Essa informação está no padrão ISO 8601.
| `lat` | *string* | Informação de latitude da localização do veículo.
| `lng` | *string* | Informação de longitude da localização do veículo.

#### Previsão da linha (lineForecast)
O tipo `lineForecast` retorna uma lista com a previsão de chegada de cada um dos veículos da linha informada em todos os pontos de parada aos quais que ela atende.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `lineId` como `integer`:

``` js
bus.find({
  auth,
  type: 'lineForecast',
  lineId: 34041
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `hour` | *string* | Horário de referência em que as informações foram geradas.
| `stops` | *array* | Representa um ponto de parada com os atributos abaixo:
| `stopId` | *integer* | Código identificador da parada.
| `name` | *string* |  Nome da parada.
| `address` | *string* |  Endereço de localização da parada.
| `lat` | *string* | Informação de latitude da localização da parada.
| `lng` | *string* | Informação de longitude da localização da parada.
| `vehicles` | *array* | Relação de veículos localizados com os atributos abaixo:
| `prefix` | *integer* | Prefixo do veículo.
| `accessible` | *bool* | Indica se o veículo é (true) ou não (false) acessível para pessoas com deficiência.
| `hour` | *string* | Indica o horário universal (UTC) em que a localização foi capturada. Essa informação está no padrão ISO 8601.
| `lat` | *string* | Informação de latitude da localização do veículo.
| `lng` | *string* | Informação de longitude da localização do veículo.

#### Previsão da parada (stopForecast)
O tipo `stopForecast` retorna uma lista com a previsão de chegada dos veículos de cada uma das linhas que atendem ao ponto de parada informado.

Aceita o código da parada. O valor deve ser passado pelo parâmetro `stopId` como `integer`:

``` js
bus.find({
  auth,
  type: 'stopForecast',
  stopId: 260015039
}).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `hour` | *string* | Horário de referência em que as informações foram geradas.
| `stops` | *array* | Representa um ponto de parada com os atributos abaixo:
| `stopId` | *integer* | Código identificador da parada.
| `name` | *string* |  Nome da parada.
| `address` | *string* |  Endereço de localização da parada.
| `lat` | *string* | Informação de latitude da localização da parada.
| `lng` | *string* | Informação de longitude da localização da parada.
| `lines` | *array* | Relação de linhas localizadas com os atributos abaixo:
| `lineId` | *string* |  Endereço de localização da parada.
| `displaySign` | *string* | Letreiro completo.
| `type` | *int* | O sentido ao qual a linha atende, onde **1** significa do Terminal Principal (mainDestination) para Terminal Secundário (secondaryDestination) e **2** do Terminal Secundário para Terminal Principal.
| `mainTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Principal para Terminal Secundário.
| `secondaryTerminal` | *string* | O letreiro descritivo da linha no sentido Terminal Secundário para Terminal Principal.
| `quantity` | *integer* | Quantidade de veículos localizados.
| `vehicles` | *array* | Relação de veículos localizados com os atributos abaixo:
| `prefix` | *integer* | Prefixo do veículo.
| `accessible` | *bool* | Indica se o veículo é (true) ou não (false) acessível para pessoas com deficiência.
| `hour` | *string* | Indica o horário universal (UTC) em que a localização foi capturada. Essa informação está no padrão ISO 8601.
| `lat` | *string* | Informação de latitude da localização do veículo.
| `lng` | *string* | Informação de longitude da localização do veículo.

#### Empresas (companies)
O tipo `companies` possibilita a consulta que retorna a relação das empresas operadoras do transporte público na cidade de São Paulo.

``` js
  bus.find({
    auth,
    type: 'companies',
  }).then(console.log)
```
##### Resposta

| Atributo | Tipo | Descrição |
| ---- | ---- | ---- |
| `hour` | *string* | Horário de referência da geração das informações.
| `companiesByOperationArea` | *array* | Relação de empresas por área de operação.
| `companiesByOperationArea.operationCode` | *integer* | Código da área de operação.
| `companiesByOperationArea.companies` | *array* | Relação de empresas.
| `companiesByOperationArea.companies.operationAreaCode` | *integer* | Código da área de operação.
| `companiesByOperationArea.companies.referenceCode` | *integer* | Código de referência da empresa.
| `companiesByOperationArea.companies.name` | *string* | nome da empresa.

## Como contribuir
Para contribuir com o projeto, [clique aqui](https://github.com/thiagommedeiros/bus-promise/blob/master/CONTRIBUTING.md).

## Changelog
Para verificar as mudanças da biblioteca acesse changelog, [clique aqui](https://github.com/thiagommedeiros/bus-promise/blob/master/CHANGELOG.md).

## Contribuidores
| [<img src="https://avatars4.githubusercontent.com/u/13632762?v=4&s=115"><br><sub>@thiamsantos</sub>](https://github.com/thiamsantos) | [<img src="https://avatars3.githubusercontent.com/u/4576630?v=4&s=115"><br><sub>@drodrigo</sub>](https://github.com/drodrigo) |
| :---: | :---: |

## Autor
| [<img src="https://avatars0.githubusercontent.com/u/19213244?v=3&s=115"><br><sub>@thiagommedeiros</sub>](https://github.com/thiagommedeiros) |
| :---: |
