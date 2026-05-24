'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { UserSafe } from '@/types';
import { Users, UserPlus, Search } from 'lucide-react';

export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<UserSafe[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao listar.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleSignup(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await api.signUp(name, email, password);
      setMessage('Usuário cadastrado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao cadastrar.');
    } finally {
      setSaving(false);
    }
  }

  const filtered = users.filter((u) =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const admins = filtered.filter((u) => u.role === 'ADMIN');
  const regulars = filtered.filter((u) => u.role === 'USER');

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Gestão de Usuários</h1>
        <p className="text-slate-500 mt-1">Visualize e cadastre usuários do sistema</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">
            <UserPlus size={20} className="text-blue-500" /> Cadastrar Usuário
          </h2>
          <form onSubmit={handleSignup} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Nome</label>
              <input
                required
                placeholder="Nome completo"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
              <input
                required
                type="email"
                placeholder="email@exemplo.com"
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Senha</label>
              <input
                required
                type="password"
                placeholder="Mínimo 8 caracteres"
                minLength={8}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            {message && <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">{message}</p>}
            <button
              type="submit"
              disabled={saving}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition-all"
            >
              {saving ? 'Cadastrando...' : 'Cadastrar Usuário'}
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-4">
            Usuários cadastrados aqui têm perfil <strong>USER</strong>. Contas ADMIN devem ser criadas diretamente no banco.
          </p>
        </section>

        {/* List */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Users size={20} className="text-slate-500" /> Usuários ({users.length})
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 mb-4">
            <Search size={16} className="text-slate-400" />
            <input
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
              placeholder="Buscar por nome ou email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="max-h-[30rem] overflow-y-auto space-y-1">
              {admins.length > 0 && (
                <>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Administradores</p>
                  {admins.map((u) => <UserRow key={u.id} user={u} />)}
                  <div className="my-3 border-t border-slate-100" />
                </>
              )}
              {regulars.length > 0 && (
                <>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">Usuários</p>
                  {regulars.map((u) => <UserRow key={u.id} user={u} />)}
                </>
              )}
              {filtered.length === 0 && (
                <p className="text-slate-400 text-sm text-center py-8">Nenhum usuário encontrado.</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function UserRow({ user }: { user: UserSafe }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-2 rounded-xl hover:bg-slate-50 transition">
      <div>
        <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
        <p className="text-xs text-slate-500">{user.email}</p>
      </div>
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
        user.role === 'ADMIN'
          ? 'bg-violet-100 text-violet-700'
          : 'bg-blue-100 text-blue-700'
      }`}>
        {user.role === 'ADMIN' ? 'Admin' : 'Usuário'}
      </span>
    </div>
  );
}
