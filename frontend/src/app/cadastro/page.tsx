'use client';

import { BookOpen, Mail, Lock, User } from 'lucide-react';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import BackendGapBanner from '@/components/BackendGapBanner';

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.signUp(name, email, password);
      setSuccess('Conta criada como leitor. Redirecionando para o login...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Não foi possível cadastrar.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-home p-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-500 p-4 rounded-full mb-4">
            <BookOpen size={42} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold">Cadastro de leitor</h1>
          <p className="text-gray-500 mt-2 text-center">
            MVP 1.1 — Criação de conta de leitor (papel USER)
          </p>
        </div>

        <BackendGapBanner
          mvpSection="1.1 Gestão de Usuários"
          endpoint="POST /auth/signup (role: ADMIN) ou POST /users"
          description="Cadastro de bibliotecários será habilitado quando o backend permitir definir o papel na criação."
        />

        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">Nome</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-2 focus-within:border-blue-500">
              <User size={20} className="text-gray-400" />
              <input
                required
                minLength={3}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full outline-none"
                placeholder="Seu nome completo"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-2 focus-within:border-blue-500">
              <Mail size={20} className="text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full outline-none"
                placeholder="email@exemplo.com"
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
                minLength={8}
                maxLength={20}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full outline-none"
                placeholder="8 a 20 caracteres"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? 'Cadastrando...' : 'Criar conta de leitor'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
