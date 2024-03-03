# Projeto Pokémon API

[Guilherme Ferreira](https://www.linkedin.com/in/guiiferreira/)

Esta aplicação web desenvolvida usando NestJS com TypeScript, para persistência de dados eu utilizei o PostgreSQL.

## Recursos

1. **Testes Unitários:** Foram escritos testes unitários para todos os métodos do *teams.service* e *teams.controller*.
![Unit test](./utils/unit-test.png)

2. **Swagger:** Para documentação de endpoints, foi utilizado o Swagger. Esta página é acessível atráves da rota `http://127.0.0.1:3000/docs`, com a aplicação em execução.
![Swagger1](./utils/swagger1.png)
![swagger2](image-1.png)

3. **Limitação de Taxa de Requisições:** Eu implementei limitação de taxa de requisições para prevenir consumo intenso da API Pokémon. Esta API não especifica um limite de taxa, mas pede aos usuários que não abusem do serviço. Abaixo segue cabeçalho HTTP mostrando o limite de taxa:
![http header](./utils/httpheader.png)

4. Este projeto foi desenvolvido individualmente, então não houve uso de *Branches*, *Pull requests* ou *Code Review*. No entanto, essas práticas devem ser seguidas em um ambiente de produção.
2. O arquivo `.env` está sendo rastreado no repositório *git* no *Github* porque este é um desafio, e não um sistema para produção.
3. Este projeto utiliza pnpm. O pnpm é um gerenciador de pacotes que oferece desempenho rápido e eficiente em termos de espaço e facilita a visualização das dependências.
4. **Padronização de Commits:** Para padronização de commits, eu segui o [gitmoji](https://gitmoji.dev/). ![gitmoji](./utils/gitmoji.png)

## Endpoints

### Criação de Time

Rota para criação de um time.

**Método:** POST  
**Endpoint:** /api/teams

#### Exemplo de Requisição

```bash
curl --request POST \
  --url http://localhost:3000/api/teams \
  --header 'Content-Type: application/json' \
  --header 'accept: application/json' \
  --data '{
  "user": "sleao",
  "team": [
    "blastoise",
    "pikachu",
    "charizard",
    "venusaur",
    "lapras",
    "dragonite"
  ]
}'
```
### Listagem de Times
Rota para listar todos os times registrados.

**Método:** GET
**Endpoint:** /api/teams

#### Exemplo de Requisição

```bash
curl --request GET \
  --url http://localhost:3000/api/teams \
  --header 'Content-Type: application/json' \
  --header 'accept: application/json'
```

### Listagem de Time por Usuário
Rota para listar um time específico de um usuário.

**Método:** GET
**Endpoint:** /api/teams/:user

#### Exemplo de Requisição

```bash
curl --request GET \
  --url http://localhost:3000/api/teams/sleao \
  --header 'Content-Type: application/json' \
  --header 'accept: application/json'
```
