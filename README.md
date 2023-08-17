# new-interview-thing

## O que é isso?
Esse projeto foi pensado para demonstrar:
* uso de containers para execução e deployment
* uso de MongoDB como storage layer
* uso de React para construir interfaces
* uso de bibliotecas simples de CSS para construir layout
* arquitetura REST priorizando princípios de:
  * separation of concearns;
  * encapsulamento;
  * minimalismo;
  * DRY.

## Como é isso?
O projeto está organizado em 3 docker containers inter-dependentes:
* mongo: executa um banco de dados utilizando a pasta `./data` na raiz do projeto;
* backend: executa uma API Express utilizando mongoose para conectar ao banco de dados;
* frontend: executa uma APP React utilizando tailwind e daisyui para estilizar as páginas.

## Como isso roda?
Uma versão relativamente atual do docker é o único pré-requisito.
Clonando o repositório, use o terminal para chegar ao diretório raiz do projeto.
### Para rodar os containers
```
docker compose up -d
```
### Para verificar os logs
```
docker compose logs mongo
docker compose logs backend
docker compose logs frontend
```
### Para parar os containers
```
docker compose down
```
### Para acessar a aplicação
[localhost:8080/content]