# Sistema de Almoxarifado

> Link do projeto: https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-emanuel783/ 

Sistema web para controle de materiais de um almoxarifado. Desenvolvido como projeto de faculdade.

## O que o sistema faz

- Cadastra materiais com nome e quantidade
- Lista todos os materiais cadastrados
- Pesquisa materiais pelo nome em tempo real
- Mostra o total de itens cadastrados
- Destaca em vermelho itens com estoque abaixo de 10
- Permite retirar (dar baixa) uma quantidade do estoque
- Permite excluir um material
- Valida se a quantidade a retirar é válida
- Trata erros de conexão com a API

## Tecnologias usadas

- HTML
- CSS
- JavaScript
- MockAPI (banco de dados na nuvem)

## Como rodar

1. Clone o repositório
2. Abra o arquivo `index.html` com o Live Server do VS Code
3. O sistema já vai carregar os materiais da API automaticamente

## Endpoints da API

- GET /Materiais - lista todos
- POST /Materiais - cadastra novo
- PUT /Materiais/:id - atualiza quantidade
- DELETE /Materiais/:id - exclui material
