<h1 align="center">SPTrans Promise</h1>

<p align="center">
<a href="https://travis-ci.org/thiagommedeiros/sptrans-promise">
<img src="https://travis-ci.org/thiagommedeiros/sptrans-promise.svg?branch=master">
</a>
<a href="https://github.com/thiagommedeiros/sptrans-promise/blob/master/LICENSE">
<img src="https://img.shields.io/github/license/mashape/apistatus.svg">
</a>
</p>

<p align="center">
Busca informações em tempo real da frota de ônibus da SPTrans na cidade de São Paulo.
</p>

<br><br>

## Sobre
O **SPTrans Promise** é uma biblioteca *Javascript (client-side e server-side)* feita para facilitar o acesso a API da SPTrans que disponibiliza dados em tempo real da frota de ônibus da cidade de São Paulo.

#### Como colaborar
Acesse nosso guia para saber como contribuir com a biblioteca, [clique aqui](https://github.com/thiagommedeiros/sptrans-promise/blob/master/CONTRIBUTING.md).

## Como utilizar

### Instalação

** Projeto em desenvolvimento (aguarde)

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

- Linhas
- Paradas
- Paradas por linha
- Corredores
- Paradas por corredor

#### Linhas
O tipo `linhas` possibilita a consulta pelas linhas de ônibus da cidade de São Paulo.

Aceita o nome da linha, número ou letreiro. O valor deve ser passado pelo parâmetro `term` como uma `string`:
``` js
import sptrans from 'sptrans-promise'

const encontrarLinhas = auth => {
  sptrans.find({
    auth,
    type: 'linhas',
    term: 'Term. Lapa'
  }).then(console.log)
}

sptrans.auth('SEU_TOKEN_AQUI')
  .then(encontrarLinhas)
```
O parâmetro `term` também aceita um `array` de `strings` para buscar várias linhas ao mesmo tempo. Exemplo:

``` js
sptrans.find({
  auth,
  type: 'linhas',
  term: ['Term. Lapa', 'Term. Pirituba']
}).then(console.log)
```

#### Paradas
O tipo `paradas` possibilita a consulta pelos pontos de parada da cidade de São Paulo. Aceita o nome da parada ou seu endereço de localização.

O valor deve ser passado pelo parâmetro `term` como uma `string` ou um `array` de `strings`:

``` js
//passando string
sptrans.find({
  auth,
  type: 'paradas',
  term: 'Av. Mutinga'
}).then(console.log)

//passando array
sptrans.find({
  auth,
  type: 'paradas',
  term: ['Av. Mutinga', 'Av. Faria Lima', 'Av. Paulista']
}).then(console.log)
```

#### Paradas por linha
O tipo `paradasPorLinha` realiza uma busca por todos os pontos de parada atendidos por uma determinada linha.

Aceita o código da linha. O valor deve ser passado pelo parâmetro `code` como um `integer` ou um `array` de `integers`:

``` js
//passando integer
sptrans.find({
  auth,
  type: 'paradasPorLinha',
  code: 34041
}).then(console.log)

//passando array
sptrans.find({
  auth,
  type: 'paradas',
  code: [34041, 34042, 34043]
}).then(console.log)
```

#### Corredores

O tipo `corredores` realiza uma busca por todos os corredores de ônibus da cidade de São Paulo.

``` js
sptrans.find({
  auth,
  type: 'corredores'    
}).then(console.log)
```
