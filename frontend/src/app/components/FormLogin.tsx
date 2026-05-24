'use client';

import { BookOpen, Mail, Lock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthProvider';
import { ApiError } from '@/lib/api';

export default function FormLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Não foi possível entrar.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-home p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 p-4 rounded-full mb-4">
            <BookOpen size={42} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold">Biblioteca</h1>
          <p className="text-gray-500 mt-2">Faça login para acessar o painel</p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-2 focus-within:border-blue-500">
              <Mail size={20} className="text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Senha</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-2 focus-within:border-blue-500">
              <Lock size={20} className="text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 transition text-white font-semibold py-3 rounded-xl"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-blue-500 hover:underline">
            Cadastre-se como leitor
          </Link>
        </p>
        <p className="text-center text-xs text-gray-400 mt-2">
          Demo: user@biblio.com / user1234 · admin@biblio.com / admin1234
        </p>
      </div>
    </div>
  );
}
