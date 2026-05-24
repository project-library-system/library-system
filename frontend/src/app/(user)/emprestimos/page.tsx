'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { Book, Exemplar, LoanItem } from '@/types';
import { loanStatusColor, loanStatusLabel } from '@/lib/loan-status';
import { BookOpen, Calendar, RotateCcw } from 'lucide-react';

type EnrichedLoan = LoanItem & {
  bookName: string;
  bookImage: string;
  bookAuthor: string;
  exemplarCode: string;
};

export default function EmprestimosPage() {
  const [loans, setLoans] = useState<EnrichedLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [loansData, booksData, exemplarsData] = await Promise.all([
        api.getMyLoans(),
        api.getBooks(),
        api.getExemplars(),
      ]);

      const booksMap: Record<string, Book> = {};
      booksData.forEach((b) => (booksMap[b.id] = b));

      const exemplarsMap: Record<string, Exemplar> = {};
      exemplarsData.forEach((e) => (exemplarsMap[e.id] = e));

      const enriched: EnrichedLoan[] = loansData.map((loan) => {
        const exemplar = exemplarsMap[loan.exemplary_id];
        const book = exemplar ? booksMap[exemplar.book_id] : undefined;
        return {
          ...loan,
          bookName: book?.name ?? 'Livro desconhecido',
          bookImage: book?.image ?? '',
          bookAuthor: book?.author ?? '',
          exemplarCode: exemplar?.code ?? loan.exemplary_id,
        };
      });

      setLoans(enriched);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar empréstimos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Meus Empréstimos</h1>
        <p className="text-slate-500 mt-1">Acompanhe suas solicitações e empréstimos ativos</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 max-w-3xl">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid gap-4 max-w-3xl">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : loans.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-400 text-lg">Você ainda não possui empréstimos.</p>
          <a href="/catalogo" className="mt-3 inline-block text-blue-500 text-sm hover:underline">
            Explorar catálogo →
          </a>
        </div>
      ) : (
        <div className="grid gap-4 max-w-3xl">
          {loans.map((loan) => (
            <article
              key={String(loan.id)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex gap-5 hover:shadow-md transition-shadow"
            >
              {/* Cover */}
              <div className="shrink-0 w-16 h-24 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={loan.bookImage}
                  alt={loan.bookName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/64x96/e2e8f0/94a3b8?text=📖';
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="font-bold text-slate-800 text-lg leading-tight truncate">{loan.bookName}</h2>
                    <p className="text-sm text-slate-500">{loan.bookAuthor}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${loanStatusColor[loan.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {loanStatusLabel[loan.status] ?? loan.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <RotateCcw size={12} /> Exemplar: <strong className="text-slate-700">{loan.exemplarCode}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> Solicitado: <strong className="text-slate-700">{new Date(loan.loan_date).toLocaleDateString('pt-BR')}</strong>
                  </span>
                  {loan.maturity_date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Devolução: <strong className="text-slate-700">{new Date(loan.maturity_date).toLocaleDateString('pt-BR')}</strong>
                    </span>
                  )}
                  {loan.return_date && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> Devolvido em: <strong className="text-slate-700">{new Date(loan.return_date).toLocaleDateString('pt-BR')}</strong>
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
