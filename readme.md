Sistema de biblioteca

Instalação das dependencias do prisma dentro da raiz
- npm install prisma @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg pg dotenv

Inicializar 
- npx prisma

Criação do arquivo Prisma/Schema
- npx prisma init --datasource-provider postgresql --output ../generated/prisma

Crie as variaveis do banco de dados na .env dentro da raiz

DATABASE_PASSWORD=exemplo
DATABASE_USER=exemplo
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=exeplo


Suba o docker com o comando:
- docker compose up --build

Remover container:
- docker compose down -v

Visualização de tabelas com docker ligado
- npx prisma studio