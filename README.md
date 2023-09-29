# HotelHero API

## Introdução
Esta API  é o backend principal da aplicação HotelHero, desenvolvida para se conectar com uma API externa da RapidAPI, armazenar os dados recuperados em um banco Postgres e fornecer esses dados ao frontend.

## Tecnologias Utilizadas
- **Node.js & Express:** Base do backend.
- **NestJS:** Proporciona uma arquitetura modular e integração com TypeScript.
- **TypeORM:** Utilizado para abstrair SQL e facilitar a comunicação com o banco de dados, com o uso de migrações para controle de versão.

## Esquema do Banco de Dados
Em breve...

## Endpoints da API
A API oferece uma variedade de funcionalidades:

### Autenticação:
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/check`

### Usuários:
- `POST /users`
- `POST /users/check-email`
- `GET /users`
- `GET /users/:id`
- `GET /users/:id/bookings`
- `PUT /users/:id`
- `PATCH /users/:userId/favorite-hotels/:hotelId`
- `DELETE /users`

### Regiões:
- `GET /regions/search`

### Hotéis:
- `POST /hotels`
- `GET /hotels`
- `GET /hotels/detail`
- `GET /hotels/:id`
- `GET /hotels/:id/unavailable-dates`
- `GET /hotels/:id/bookings`
- `PUT /hotels/:id`

### Reservas:
- `POST /bookings`
- `GET /bookings/:id`
- `PUT /bookings/:id`
- `PATCH /bookings/:id/finalize`

## Testes
Em breve...

## Autenticação
A autenticação é gerenciada por JWTs via cookies, com a estratégia JWT do **`passport`**.

## Deploy
Realizado com GitHub Actions e hospedado na plataforma Render.

## Desafios & Aprendizados
- **Gestão de Dados:** Integrar-se a uma API externa e adaptar-se ao Postgres, especialmente via Docker, me trouxe desafios significativos. A transformação de dados e a filtragem de informações desnecessárias foram etapas cruciais.

- **Autenticação:** Criar um sistema de autenticação do zero, usando JWT e cookies, foi uma experiência rica. Aprofundei-me na manipulação detalhada de pedidos e respostas.

- **Deploy:** A seleção de uma plataforma de hospedagem e a implementação de um pipeline CI/CD foram novidades para mim, reforçando a importância de deploys automatizados.

- **Design da API:** Aperfeiçoei minha abordagem ao criar endpoints claros, sempre alinhados aos princípios REST.

- **Escalabilidade:** O projeto destacou a importância de uma estrutura modular e organizada, algo que o NestJS facilita.

- **Projeto de Banco de Dados:** A complexidade inicial do design de banco de dados foi superada à medida que compreendi melhor as relações entre tabelas.

- **Segurança:** Aprofundei meu conhecimento em segurança de backend, desde a utilização de JWT até a implementação de CORS, HTTPS e criptografia, garantindo transmissões de dados seguras.
