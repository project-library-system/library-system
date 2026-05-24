'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { Book, Exemplar } from '@/types';
import { Layers, Search, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = ['AVAILABLE', 'LOANED', 'MAINTENANCE', 'LOST'] as const;

const statusLabel: Record<string, string> = {
  AVAILABLE: 'Disponível',
  LOANED: 'Emprestado',
  MAINTENANCE: 'Manutenção',
  LOST: 'Extraviado',
};

const statusColor: Record<string, string> = {
  AVAILABLE: 'bg-emerald-100 text-emerald-700',
  LOANED: 'bg-blue-100 text-blue-700',
  MAINTENANCE: 'bg-amber-100 text-amber-700',
  LOST: 'bg-red-100 text-red-700',
};

export default function AdminExemplaresPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [exemplars, setExemplars] = useState<Exemplar[]>([]);
  const [bookId, setBookId] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>('AVAILABLE');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, e] = await Promise.all([api.getBooks(), api.getExemplars()]);
      setBooks(b);
      setExemplars(e);
      if (b.length && !bookId) setBookId(b[0].id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await api.createExemplar({ book_id: bookId, code, status });
      setMessage('Exemplar cadastrado com sucesso!');
      setCode('');
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao cadastrar.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Deseja remover este exemplar?')) return;
    setDeletingId(id);
    try {
      await api.deleteExemplar(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao remover.');
    } finally {
      setDeletingId(null);
    }
  }

  const bookName = (id: string) => books.find((b) => b.id === id)?.name ?? '—';

  const filteredExemplars = exemplars.filter((ex) =>
    !search ||
    ex.code.toLowerCase().includes(search.toLowerCase()) ||
    bookName(ex.book_id).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Layers size={28} className="text-slate-600" /> Gestão de Exemplares
        </h1>
        <p className="text-slate-500 mt-1">Gerencie os exemplares físicos do acervo</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-5">Novo Exemplar</h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Livro</label>
              <select
                required
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              >
                {books.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Código do Exemplar</label>
              <input
                required
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ex: ISBN-001"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status Inicial</label>
              <select
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={status}
                onChange={(e) => setStatus(e.target.value as (typeof STATUS_OPTIONS)[number])}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{statusLabel[s]}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            {message && <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">{message}</p>}
            <button
              type="submit"
              disabled={saving || !books.length}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition-all"
            >
              {saving ? 'Salvando...' : 'Cadastrar Exemplar'}
            </button>
          </form>
        </section>

        {/* List */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">
              Exemplares ({exemplars.length})
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 mb-4">
            <Search size={16} className="text-slate-400" />
            <input
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-400"
              placeholder="Buscar por código ou livro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filteredExemplars.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">Nenhum exemplar encontrado.</p>
          ) : (
            <ul className="divide-y divide-slate-50 max-h-[32rem] overflow-y-auto">
              {filteredExemplars.map((ex) => (
                <li key={ex.id} className="py-3 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{bookName(ex.book_id)}</p>
                    <p className="text-xs text-slate-500">Cód: {ex.code}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusColor[ex.status] ?? 'bg-gray-100'}`}>
                    {statusLabel[ex.status] ?? ex.status}
                  </span>
                  <button
                    onClick={() => handleDelete(ex.id)}
                    disabled={deletingId === ex.id}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
