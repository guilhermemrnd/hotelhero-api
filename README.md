# HotelHero API

## Introdução
Esta API serve como o backend principal para a aplicação HotelHero. Seu principal objetivo é se conectar com uma API externa da RapidAPI, persistir os dados recuperados em um banco de dados Postgres e, posteriormente, fornecer esses dados para o frontend.

## Tecnologias Utilizadas
- **Node.js & Express:** Estes formam o runtime principal e o framework para construir o backend.
- **NestJS:** Escolhido por sua escalabilidade e capacidades de desenvolvimento rápido, o NestJS traz uma arquitetura modular, tornando mais fácil organizar e escalar o backend. Ele também se integra bem com TypeScript, garantindo segurança de tipo e melhorando a produtividade do desenvolvedor.
- **TypeORM:** Este ORM foi usado para abstrair o SQL do código, simplificando a comunicação entre o backend e o banco de dados. Além disso, migrações foram empregadas para controlar a versão do banco de dados, garantindo transições suaves e atualizações.

## Esquema do Banco de Dados
Em breve...

## Endpoints da API
A API oferece uma variedade de funcionalidades:

### Autenticação:
- `POST /auth/login`: Login
- `POST /auth/logout`: Logout
- `GET /auth/check`: Verificar status de autenticação

### Usuários:
- `POST /users`: Criar usuário
- `POST /users/check-email`: Verificar disponibilidade de email
- `GET /users`: Recuperar todos os usuários
- `GET /users/:id`: Recuperar usuário específico
- `GET /users/:id/bookings`: Recuperar reservas de um usuário
- `PUT /users/:id`: Atualizar usuário
- `PATCH /users/:userId/favorite-hotels/:hotelId`: Favoritar um hotel
- `DELETE /users`: Deletar usuário

### Regiões:
- `GET /regions/search`: Pesquisar regiões predefinidas

### Hotéis:
- `POST /hotels`: Criar hotel
- `GET /hotels`: Recuperar todos os hotéis
- `GET /hotels/detail`: Recuperar detalhes do hotel
- `GET /hotels/:id`: Recuperar hotel específico
- `GET /hotels/:id/unavailable-dates`: Recuperar datas indisponíveis para um hotel
- `GET /hotels/:id/bookings`: Recuperar reservas para um hotel
- `PUT /hotels/:id`: Atualizar hotel

### Reservas:
- `POST /bookings`: Criar reserva
- `GET /bookings/:id`: Recuperar reserva específica
- `PUT /bookings/:id`: Atualizar reserva
- `PATCH /bookings/:id/finalize`: Finalizar reserva após confirmação de pagamento

## Testes
Em breve...

## Autenticação
A autenticação na API é gerenciada usando JWTs passados via cookies. A funcionalidade subjacente é alimentada pela biblioteca passport, especificamente utilizando a estratégia JWT. Um sistema de funções e permissões não foi implementado nesta versão.

## Deploy
O deploy do backend foi realizado usando um pipeline CI/CD configurada com GitHub Actions. A aplicação é hospedada na plataforma Render, garantindo um deploy suave e escalavel.
