## Como contribuir
1. Crie um fork do projeto para sua conta;
2. Clone o projeto para sua máquina;
3. Instale o projeto com `yarn install` ou `npm install`.

## O que você precisa saber para contribuir
- O `bus-promise` funciona no lado do servidor (nodejs) e também no lado do browser.
- A biblioteca busca os dados em duas fontes:
  - **API da SPTrans**: você deve criar uma conta de desenvolvedor para ter acesso a documentação da API (http://www.sptrans.com.br/desenvolvedores).
  - **bus-server**: este é outro projeto *open-source* que serve de apoio para o `bus-promise`. Basicamente, a SPTrans disponibiliza parte dos dados na sua API e outra parte em arquivos `.csv`, que seguem um formato internacional chamado **GTFS**. O papel principal do **bus-server** é fornecer uma `API RESTful` para o `bus-promise` consultar os dados GTFS. Outro papel desse *server* é receber as *requests* do `bus-promise` feitas no *browser*, dado que a API da SPTrans **não fornece suporte a `CORS`**.  Link do projeto: (https://github.com/thiagommedeiros/bus-server).
 - A SPTrans atualiza os arquivos GTFS diariamente, então precisamos manter os arquivos do `bus-server` atualizado regularmente. Basicamente é fazer download dos arquivos no site da SPTrans e abrir um PR no `bus-server`.


## Pull Requests

- Antes de submeter um pull request, crie uma issue informando o que você está fazendo;
- Coloque o link da issue na descrição do seu pull request;
- Crie pull requests pequenos para que a revisão seja feita mais facilmente;
- Inclua detalhes do que está sendo feito na descrição;
- Altere a documentação se for necessário;
- Escreva testes;
- Verifique se todos os testes estão passando;
- Não esqueça de verificar o build com as validações no travis-ci.

## Reportando Issues

Se você encontrou bugs ou tem sugestões de melhorias, crie uma issue [aqui](https://github.com/thiagommedeiros/bus-promise/issues).
