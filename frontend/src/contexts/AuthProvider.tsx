'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { clearAuth, getRole, getToken, saveAuth } from '@/lib/auth';
import type { UserRole } from '@/types';

type AuthContextValue = {
  token: string | null;
  role: UserRole | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToken(getToken());
    setRole(getRole());
    setLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await api.signIn(email, password);
      saveAuth(res.access_token, res.role);
      setToken(res.access_token);
      setRole(res.role);
      router.push(res.role === 'ADMIN' ? '/admin' : '/catalogo');
    },
    [router],
  );

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setRole(null);
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
