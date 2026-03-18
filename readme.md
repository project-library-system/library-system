Sistema de biblioteca

Instalação das dependencias do prisma dentro da raiz
- npm install prisma @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg pg dotenv

Inicializar 
- npx prisma

Criação do arquivo Prisma/Schema
- npx prisma init --datasource-provider postgresql --output ../generated/prisma

Crie as variaveis do banco de dados na .env dentro da raiz

DB_PASSWORD=admin
DB_USER=admin
DB_HOST=localhost
DB_PORT=5432
DB_NAME=library_system
DATABASE_URL=postgresql://admin:admin@localhost:5432/library_system?schema=public


Suba o docker com o comando:
- docker compose up --build

Remover container:
- docker compose down -v

Visualização de tabelas com docker ligado
- npx prisma studio