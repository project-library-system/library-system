import type { UserRole } from '@/types';

const TOKEN_KEY = 'library_token';
const ROLE_KEY = 'library_role';

export function saveAuth(token: string, role: UserRole) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): UserRole | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ROLE_KEY) as UserRole | null;
}
