/**
 * Lacunas de API — MVP Fase 1
 * Estas funções documentam endpoints ainda não consumidos pelo frontend
 * ou fluxos que exigem evolução no backend. Substitua por chamadas em `api.ts`
 * quando o backend estiver pronto.
 */

export class BackendNotReadyError extends Error {
  constructor(
    message: string,
    public readonly endpoint: string,
    public readonly mvpSection: string,
  ) {
    super(message);
    this.name = 'BackendNotReadyError';
  }
}

/** 1.1 — Cadastro de bibliotecário com papel ADMIN (hoje signup força USER) */
export async function registerLibrarian(_data: {
  name: string;
  email: string;
  password: string;
}): Promise<never> {
  throw new BackendNotReadyError(
    'Cadastro de bibliotecários ainda não expõe seleção de papel no backend.',
    'POST /auth/signup (role: ADMIN) ou POST /users',
    '1.1 Gestão de Usuários',
  );
}

/** 1.3 — Registrar devolução e atualizar status do exemplar para AVAILABLE */
export async function registerLoanReturn(_loanId: string): Promise<never> {
  throw new BackendNotReadyError(
    'Endpoint de devolução não integrado. Deve atualizar loan (RETURNED) e exemplar (AVAILABLE).',
    'PATCH /loan/:id/return',
    '1.3 Gestão de Empréstimos',
  );
}

/** 1.2 — Busca server-side por título, autor ou categoria (hoje filtro é só no cliente) */
export async function searchBooks(_query: {
  q?: string;
  genre?: string;
}): Promise<never> {
  throw new BackendNotReadyError(
    'Busca paginada/filtrada no servidor ainda não disponível.',
    'GET /book/search?q=&genre=',
    '1.2 Gestão de Livros',
  );
}

/** 1.3 — Empréstimo direto pelo bibliotecário (sem fluxo de aprovação) */
export async function createDirectLoan(_data: {
  user_id: string;
  exemplary_id: string;
  due_date: string;
}): Promise<never> {
  throw new BackendNotReadyError(
    'Empréstimo administrativo direto ainda não exposto na API.',
    'POST /loan (admin, status APPROVED + atualizar exemplar)',
    '1.3 Gestão de Empréstimos',
  );
}
