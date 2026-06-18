# Sistema de Almoxarifado

Sistema web para controle de materiais de um almoxarifado. Desenvolvido como projeto de faculdade.

## O que o sistema faz

- Cadastra materiais com nome e quantidade
- Lista todos os materiais cadastrados
- Permite retirar (dar baixa) uma quantidade do estoque
- Permite excluir um material
- Valida se a quantidade a retirar é válida (não aceita negativos nem maior que o estoque)

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