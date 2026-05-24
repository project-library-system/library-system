import { getToken, clearAuth } from './auth';
import type {
  AuthResponse,
  Book,
  BookCatalogItem,
  Exemplar,
  LoanItem,
  LoanStatus,
  UserSafe,
} from '@/types';

const API_URL = 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 401) clearAuth();
    const message =
      typeof data.message === 'string'
        ? data.message
        : Array.isArray(data.message)
          ? data.message.join(', ')
          : 'Erro na requisição';
    throw new ApiError(message, res.status);
  }

  return data as T;
}

export const api = {
  // ── Auth ──────────────────────────────────────────────
  signIn: (email: string, password: string) =>
    request<AuthResponse>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signUp: (name: string, email: string, password: string) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  // ── Books  →  GET /book  |  POST /book  |  PUT /book/:id  |  DELETE /book/:id ──
  getBooks: () => request<BookCatalogItem[]>('/book'),

  getCatalog: () => request<BookCatalogItem[]>('/book'),

  getBookByIsbn: (isbn: string) => request<Book>(`/book/isbn/${isbn}`),

  createBook: (data: Omit<Book, 'id'>) =>
    request<Book>('/book', { method: 'POST', body: JSON.stringify(data) }),

  updateBook: (id: string, data: Partial<Omit<Book, 'id'>>) =>
    request<Book>(`/book/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteBook: (id: string) =>
    request<void>(`/book/${id}`, { method: 'DELETE' }),

  // ── Exemplars  →  GET /exemplary  |  POST /exemplary  |  PUT /exemplary/:id  |  DELETE /exemplary/:id ──
  getExemplars: () => request<Exemplar[]>('/exemplary'),

  getExemplarById: (id: string) => request<Exemplar>(`/exemplary/${id}`),

  createExemplar: (data: { book_id: string; code: string; status: Exemplar['status'] }) =>
    request<Exemplar>('/exemplary', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateExemplar: (id: string, data: Partial<{ book_id: string; code: string; status: Exemplar['status'] }>) =>
    request<Exemplar>(`/exemplary/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteExemplar: (id: string) =>
    request<void>(`/exemplary/${id}`, { method: 'DELETE' }),

  // ── Loans  →  POST /loan  |  GET /loan  |  GET /loan/:id  |  GET /loan/user/me  |  GET /loan/user/:user_id  |  GET /loan/exemplary/:exemplary_id  |  PUT /loan/:id  |  DELETE /loan/:id ──
  createLoan: (data: {
    exemplary_id: string;
    user_id: string;
    loan_date: string;
    due_date: string;
    return_date?: string | null;
    status: LoanStatus;
  }) =>
    request<LoanItem>('/loan', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAllLoans: () => request<LoanItem[]>('/loan'),

  getLoanById: (id: string) => request<LoanItem>(`/loan/${id}`),

  getMyLoans: () => request<LoanItem[]>('/loan/user/me'),

  getLoansByUser: (user_id: string) => request<LoanItem[]>(`/loan/user/${user_id}`),

  getLoansByExemplary: (exemplary_id: string) =>
    request<LoanItem>(`/loan/exemplary/${exemplary_id}`),

  updateLoan: (id: string, data: Partial<{
    exemplary_id: string;
    user_id: string;
    loan_date: string;
    due_date: string;
    return_date: string | null;
    status: LoanStatus;
  }>) =>
    request<LoanItem>(`/loan/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  approveLoan: (id: string) =>
    request<LoanItem>(`/loan/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'APPROVED' }),
    }),

  rejectLoan: (id: string) =>
    request<LoanItem>(`/loan/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'REJECTED' }),
    }),

  returnLoan: (id: string) =>
    request<LoanItem>(`/loan/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status: 'RETURNED', return_date: new Date().toISOString() }),
    }),

  deleteLoan: (id: string) =>
    request<void>(`/loan/${id}`, { method: 'DELETE' }),

  // ── Users  →  GET /users  |  GET /users/email/:email  |  PUT /users/id  |  DELETE /users/id ──
  getUsers: () => request<UserSafe[]>('/users'),

  getUserByEmail: (email: string) => request<UserSafe>(`/users/email/${email}`),
};
