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

### Como colaborar
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
O tipo `linhas` deve receber o parâmetro `term` como `string`:
``` js
import sptrans from 'sptrans-promise'

sptrans.auth('SEU_TOKEN_AQUI')
  .then(encontrarLinhas)

 const encontrarLinhas = auth => {
    sptrans.find({
        auth,
        type: 'linhas',
        term: 'Term. Lapa'
    }).then(console.log)
 }
```
O `term` também aceita um `array` de `strings` para buscar varias linhas:

``` js
sptrans.find({
    auth,
    type: 'linhas',
    term: ['Term. Lapa', 'Term. Pirituba']
}).then(console.log)
```
