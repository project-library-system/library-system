'use client';

import { useCallback, useEffect, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import CardBooks from '@/app/components/CardBooks';
import { api, ApiError } from '@/lib/api';
import type { BookCatalogItem, Exemplar } from '@/types';
import { useAuth } from '@/contexts/AuthProvider';

export default function CatalogoPage() {
  const { token } = useAuth();
  const [books, setBooks] = useState<BookCatalogItem[]>([]);
  const [exemplars, setExemplars] = useState<Exemplar[]>([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestingId, setRequestingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [booksData, exemplarsData] = await Promise.all([
        api.getCatalog(),
        api.getExemplars(),
      ]);
      setBooks(booksData);
      setExemplars(exemplarsData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar livros.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function handleRequest(bookId: string) {
    if (!token) {
      showToast('error', 'Você precisa estar logado para solicitar um empréstimo.');
      return;
    }

    // Find first available exemplar for this book
    const availableExemplar = exemplars.find(
      (ex) => ex.book_id === bookId && ex.status === 'AVAILABLE'
    );

    if (!availableExemplar) {
      showToast('error', 'Não há exemplares disponíveis para este livro no momento.');
      return;
    }

    setRequestingId(bookId);
    try {
      const today = new Date();
      const dueDate = new Date(today);
      dueDate.setDate(today.getDate() + 14); // 14 days loan period

      // We need the user_id from the token — decode JWT payload
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId: string = payload.sub;

      await api.createLoan({
        exemplary_id: availableExemplar.id,
        user_id: userId,
        loan_date: today.toISOString(),
        due_date: dueDate.toISOString(),
        return_date: null,
        status: 'PENDING',
      });

      showToast('success', `Solicitação enviada! Aguarde aprovação do administrador.`);
      await loadData();
    } catch (err) {
      showToast('error', err instanceof ApiError ? err.message : 'Não foi possível solicitar.');
    } finally {
      setRequestingId(null);
    }
  }

  const genres = [...new Set(books.map((b) => b.genre))].sort();

  const filtered = books.filter((b) => {
    const q = search.toLowerCase();
    const matchText =
      !q ||
      b.name.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.isbn?.toLowerCase().includes(q);
    const matchGenre = !genre || b.genre === genre;
    return matchText && matchGenre;
  });

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Catálogo de Livros</h1>
        <p className="text-slate-500 mt-1">Explore nosso acervo e solicite empréstimos</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl">
        <div className="flex flex-1 items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            className="w-full outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
            type="text"
            placeholder="Buscar por título, autor ou ISBN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 shadow-sm">
          <SlidersHorizontal size={16} className="text-slate-400" />
          <select
            className="py-3 bg-transparent outline-none text-sm text-slate-700 min-w-[10rem] cursor-pointer"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Todos os gêneros</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
          toast.type === 'success'
            ? 'bg-emerald-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 max-w-2xl">
          {error}
        </div>
      )}

      {/* Results count */}
      {!loading && (
        <p className="text-sm text-slate-500 mb-4">
          {filtered.length} {filtered.length === 1 ? 'livro encontrado' : 'livros encontrados'}
        </p>
      )}

      {/* Books Grid */}
      {loading ? (
        <div className="flex flex-wrap gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-64 h-96 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">Nenhum livro encontrado.</p>
          {(search || genre) && (
            <button
              onClick={() => { setSearch(''); setGenre(''); }}
              className="mt-3 text-blue-500 text-sm hover:underline"
            >
              Limpar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filtered.map((book) => (
            <CardBooks
              key={book.id}
              book={book}
              onRequest={handleRequest}
              requesting={requestingId === book.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
