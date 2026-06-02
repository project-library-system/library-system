# 📚 Sistema de Gerenciamento de Biblioteca (Library System)

Este é um sistema robusto e moderno de gerenciamento de biblioteca, projetado com uma arquitetura desacoplada e baseada em **Domain-Driven Design (DDD)**. O projeto é composto por uma API de alta performance no **Backend (NestJS + Prisma + PostgreSQL)** e um painel interativo no **Frontend (Next.js + TailwindCSS)**.

---

## 🚀 Tecnologias Utilizadas

### Backend
* **Runtime & Framework:** Node.js (v18+) e **NestJS** (TypeScript)
* **ORM:** **Prisma**
* **Banco de Dados:** **PostgreSQL**
* **Autenticação:** **JWT (JSON Web Token)** & Criptografia com **Bcrypt**
* **Arquitetura:** Injeção de Dependências, Domain-Driven Design (DDD), Adapter Pattern

### Frontend
* **Framework:** **Next.js** (App Router & TailwindCSS)
* **Estilização:** **Vanilla CSS / TailwindCSS** & **Lucide React** (Ícones)
* **Autenticação:** Contexto do React (`AuthProvider`) guardando estados de sessão e rotas protegidas (`ProtectedRoute`)

---

## 🎨 Padrões de Projeto (GoF) Implementados

### 1. Padrões Criacionais
* **Singleton (PrismaService & Repositories):** Garantimos instâncias únicas injetadas via contêiner IoC do NestJS, otimizando as conexões abertas com o banco PostgreSQL.
* **Factory Method (`Entity.create`):** Centraliza a criação consistente de objetos ricos de domínio (`User.create()`, `Book.create()`, `Exemplar.create()`, `Loan.create()`), encapsulando valores default e geração automatizada de UUIDs.

### 2. Padrões Estruturais
* **Adapter (Repositories):** Adaptamos as interfaces de domínio (ex: `UserRepository`) às APIs específicas do Prisma ORM (`UserPrismaRepository`). Isso garante desacoplamento total da base de dados.
* **Decorator (NestJS):** Usado extensivamente para adicionar metadados, controle de permissões de acesso RBAC (`@Roles()`), rotas públicas (`@Public()`) e injeções de dependência (`@Injectable()`).

---

## 🌟 Funcionalidades Principais (MVP)

### 👥 Gestão de Usuários & Segurança
* Cadastro de leitores diretamente pela interface pública.
* Autenticação JWT com expiração segura de token.
* Controle de permissões baseado em papéis (**Administrador** vs **Leitor**).

### 📖 Catálogo de Livros & Exemplares Físicos
* Cadastro simplificado de novos livros e exemplares pelo Administrador.
* Busca inteligente de acervo no catálogo por Título, Autor ou ISBN.
* **Controle de Unidades & Blur Visual:** O sistema exibe o número total e disponível de exemplares. Caso um livro possua **0 unidades cadastradas ou disponíveis**, a imagem da capa do livro ganha um efeito de desfoque elegante (blur), identificando visualmente a indisponibilidade para Leitores e Administradores.

### 🤝 Gestão de Empréstimos & Regras de Negócio
* **Solicitação de Empréstimo:** O leitor solicita um exemplar disponível pelo catálogo.
* **Limite Crítico de Agendamentos:** Um leitor **só pode possuir no máximo 2 agendamentos ativos** (`PENDING`, `APPROVED` ou `OVERDUE`). Novas solicitações são impedidas pelo backend até que ele devolva os livros pendentes.
* **Aprovação do Administrador:** O bibliotecário pode aprovar, rejeitar ou registrar a devolução de um empréstimo pelo painel administrativo, atualizando o status do exemplar no ato.

---

## 🔑 Credenciais de Demonstração (Seed)

Após rodar a configuração, você poderá acessar o sistema com as seguintes credenciais padrão:

| Papel | E-mail | Senha |
| :--- | :--- | :--- |
| **Administrador** | `admin@biblio.com` | `admin1234` |
| **Leitor / Usuário** | `user@biblio.com` | `user1234` |
| **Luiz Eduardo** | `luiz123@email.com` | `luiz1234` |

---

## 🛠️ Como Executar o Projeto Localmente

### 1. Pré-requisitos
* **Node.js** instalado (versão 18 ou superior)
* Banco de dados **PostgreSQL** rodando localmente (ex: porta 5432)

---

### 2. Configurando o Backend (NestJS)

1. Entre no diretório do backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie e configure o arquivo `.env` na raiz da pasta `backend`:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomeDoBanco?schema=public"
   JWT_SECRET="SEU_SEGREDO_SUPER_SEGURO"
   ```
   *(Substitua as credenciais da `DATABASE_URL` se o seu PostgreSQL local possuir configurações diferentes)*.

4. Sincronize e gere o banco de dados via Prisma:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Rode o backend em modo de desenvolvimento:
   ```bash
   npm run start:dev
   ```
   *O backend estará rodando no endereço: `http://localhost:8000`*

---

### 3. Configurando o Frontend (Next.js)

1. Abra uma nova janela do terminal e entre no diretório do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie o arquivo `.env` na raiz da pasta `frontend` indicando a URL da API:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:8000"
   ```
4. Rode o frontend em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O frontend estará rodando no endereço: `http://localhost:3000`*

---

## 🧪 Scripts Extras Disponíveis

* **Abrir painel visual do banco de dados (Prisma Studio):**
  ```bash
  npx prisma studio
  ```
* **Executar compilação de produção do Frontend:**
  ```bash
  npm run build
  ```
