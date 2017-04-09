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

## Como utilizar


### Instalação

** Projeto em desenvolvimento

### Token

A API da SPTrans exige autenticação com um `token` que você pode obter ao  se cadastrar pelo link: http://www.sptrans.com.br/desenvolvedores/.

### Autenticação
O método `auth()` recebe o `token` e retorna uma `Promise` com as `credentials`.

``` js
import sptrans from 'sptrans-promise'

sptrans.auth('SEU_TOKEN_AQUI').then(console.log)
```

