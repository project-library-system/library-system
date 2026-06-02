'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import { api, ApiError } from '@/lib/api';
import type { Book, Exemplar } from '@/types';

const emptyForm = {
  isbn: '',
  name: '',
  author: '',
  publisher: '',
  genre: '',
  year: new Date().getFullYear(),
  image: '',
};

export default function AdminLivrosPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [exemplars, setExemplars] = useState<Exemplar[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [booksData, exemplarsData] = await Promise.all([
        api.getBooks(),
        api.getExemplars(),
      ]);
      setBooks(booksData);
      setExemplars(exemplarsData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao listar livros.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await api.createBook({ ...form, year: Number(form.year) });
      setMessage('Livro cadastrado com sucesso!');
      setForm(emptyForm);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao cadastrar.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Deseja remover este livro?')) return;
    setDeletingId(id);
    try {
      await api.deleteBook(id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao remover.');
    } finally {
      setDeletingId(null);
    }
  }

  const filtered = books.filter((b) =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Gestão de Livros</h1>
        <p className="text-slate-500 mt-1">Cadastre e gerencie o acervo da biblioteca</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-5">
            <Plus size={20} className="text-blue-500" /> Novo Livro
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            {(
              [
                ['isbn', 'ISBN'],
                ['name', 'Título'],
                ['author', 'Autor'],
                ['publisher', 'Editora'],
                ['genre', 'Categoria / Gênero'],
                ['image', 'URL da Capa'],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
                <input
                  required={key !== 'image'}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Ano de Publicação</label>
              <input
                type="number"
                required
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
              />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            {message && <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">{message}</p>}
            <button
              type="submit"
              disabled={saving}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition-all"
            >
              {saving ? 'Salvando...' : 'Cadastrar Livro'}
            </button>
          </form>
        </section>

        {/* List */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Acervo ({books.length})</h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 mb-4">
            <Search size={16} className="text-slate-400" />
            <input
              className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              placeholder="Buscar livro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">Nenhum livro encontrado.</p>
          ) : (
            <ul className="divide-y divide-slate-50 max-h-[32rem] overflow-y-auto">
              {filtered.map((b) => {
                const bookExemplarsCount = exemplars.filter((ex) => ex.book_id === b.id).length;

                return (
                  <li key={b.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={b.image}
                      alt=""
                      className={`w-10 h-14 object-cover bg-slate-100 rounded-lg shrink-0 transition-all ${
                        bookExemplarsCount === 0 ? 'blur-[1.5px] grayscale opacity-70' : ''
                      }`}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/40x56/e2e8f0/94a3b8?text=📖'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{b.name}</p>
                      <p className="text-xs text-slate-500">{b.author}</p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        <span>{b.genre} · {b.year}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                          bookExemplarsCount === 0 
                            ? 'bg-red-50 text-red-600 border border-red-100' 
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {bookExemplarsCount} {bookExemplarsCount === 1 ? 'unidade' : 'unidades'}
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(b.id)}
                      disabled={deletingId === b.id}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
