'use client';

import { useEffect, useState } from 'react';
import { BookOpen, Users, Handshake, Clock } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import Link from 'next/link';

type Stats = {
  books: number;
  users: number;
  loans: number;
  pending: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const [books, users, loans] = await Promise.all([
          api.getBooks(),
          api.getUsers(),
          api.getAllLoans(),
        ]);
        setStats({
          books: books.length,
          users: users.length,
          loans: loans.length,
          pending: loans.filter((l) => l.status === 'PENDING').length,
        });
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Erro ao carregar dados.');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const cards = [
    {
      label: 'Total de Livros',
      value: stats?.books ?? 0,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/livros',
    },
    {
      label: 'Usuários Cadastrados',
      value: stats?.users ?? 0,
      icon: Users,
      color: 'from-violet-500 to-violet-600',
      href: '/admin/usuarios',
    },
    {
      label: 'Total de Empréstimos',
      value: stats?.loans ?? 0,
      icon: Handshake,
      color: 'from-emerald-500 to-emerald-600',
      href: '/admin/emprestimos',
    },
    {
      label: 'Pendentes de Aprovação',
      value: stats?.pending ?? 0,
      icon: Clock,
      color: 'from-amber-400 to-amber-500',
      href: '/admin/emprestimos',
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Painel Administrativo</h1>
        <p className="text-slate-500 mt-1">Visão geral do sistema de biblioteca</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 max-w-lg">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {cards.map(({ label, value, icon: Icon, color, href }) => (
          <Link href={href} key={label}>
            <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
              <div className="flex justify-between items-start">
                <div className="bg-white/20 rounded-xl p-2.5">
                  <Icon size={22} className="text-white" />
                </div>
                <span className="text-4xl font-bold">
                  {loading ? '—' : value}
                </span>
              </div>
              <p className="mt-5 text-sm font-semibold text-white/90">{label}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-slate-800 mb-4">Acesso Rápido</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
          {[
            { label: 'Gerenciar Livros', href: '/admin/livros', desc: 'Cadastrar e editar acervo' },
            { label: 'Gerenciar Exemplares', href: '/admin/exemplares', desc: 'Controle de exemplares físicos' },
            { label: 'Aprovar Empréstimos', href: '/admin/emprestimos', desc: 'Ver solicitações pendentes' },
          ].map(({ label, href, desc }) => (
            <Link key={href} href={href}>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                <p className="font-semibold text-slate-800 text-sm">{label}</p>
                <p className="text-xs text-slate-500 mt-1">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
