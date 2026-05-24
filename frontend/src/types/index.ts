export type UserRole = 'USER' | 'ADMIN';

/** Usado tanto no catálogo público quanto nas listagens admin */
export type BookCatalogItem = {
  id: string;
  isbn: string;
  name: string;
  author: string;
  publisher: string;
  genre: string;
  year: number;
  image: string;
};

/** Alias — mesmo shape que BookCatalogItem (backend retorna o mesmo objeto) */
export type Book = BookCatalogItem;

export type Exemplar = {
  id: string;
  book_id: string;
  code: string;
  status: 'AVAILABLE' | 'LOANED' | 'MAINTENANCE' | 'LOST';
  created_at?: string;
};

export type UserSafe = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
};

export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED' | 'OVERDUE';

/** Shape real retornado pelo backend (apenas IDs, sem nested objects) */
export type LoanItem = {
  id: string;
  exemplary_id: string;
  user_id: string;
  loan_date: string;
  maturity_date: string;
  return_date: string | null;
  status: LoanStatus;
};

export type AdminStats = {
  books: number;
  users: number;
  loans: number;
  pending: number;
};

export type AuthResponse = {
  access_token: string;
  expiresIn: string;
  role: UserRole;
};
