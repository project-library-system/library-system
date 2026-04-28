# Library System - Backend

Este projeto é um sistema de gerenciamento de biblioteca desenvolvido com NestJS e Prisma.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/)
- Um banco de dados [PostgreSQL](https://www.postgresql.org/) rodando localmente.

## Configuração do Ambiente

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz da pasta `backend` (se ainda não existir) e adicione a URL de conexão do seu banco de dados PostgreSQL:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
   ```
   *Substitua `USUARIO`, `SENHA` e `NOME_DO_BANCO` pelas suas credenciais locais.*

## Configuração do Banco de Dados

Com o banco de dados rodando e a `DATABASE_URL` configurada, execute os seguintes comandos para preparar o banco:

1. Gere o cliente do Prisma:
   ```bash
   npx prisma generate
   ```

2. Execute as migrações para criar as tabelas:
   ```bash
   npx prisma migrate dev
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento com hot-reload:

```bash
npm run start:dev
```

O servidor estará disponível em `http://localhost:3000`.

## Scripts Disponíveis

- `npm run build`: Compila o projeto.
- `npm run start`: Inicia o servidor.
- `npm run start:dev`: Inicia o servidor em modo de desenvolvimento (watch mode).
- `npm run test`: Executa os testes unitários.
- `npx prisma studio`: Abre uma interface visual para explorar o banco de dados.
