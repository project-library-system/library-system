'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from '@/lib/api';
import type { Book, Exemplar, LoanItem, LoanStatus } from '@/types';
import { loanStatusColor, loanStatusLabel } from '@/lib/loan-status';
import { CheckCircle, XCircle, RotateCcw, Search, SlidersHorizontal } from 'lucide-react';

type EnrichedLoan = LoanItem & {
  bookName: string;
  bookImage: string;
  exemplarCode: string;
  userName: string;
};

export default function AdminEmprestimosPage() {
  const [loans, setLoans] = useState<EnrichedLoan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<LoanStatus | ''>('');
  const [search, setSearch] = useState('');
  const [actionId, setActionId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [loansData, booksData, exemplarsData] = await Promise.all([
        api.getAllLoans(),
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
          exemplarCode: exemplar?.code ?? loan.exemplary_id,
          userName: loan.user_id,
        };
      });

      setLoans(enriched);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar empréstimos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleAction(loanId: string, status: LoanStatus) {
    setActionId(loanId);
    try {
      const updateData: { status: LoanStatus; return_date?: string } = { status };
      if (status === 'RETURNED') {
        updateData.return_date = new Date().toISOString();
      }
      await api.updateLoan(loanId, updateData);
      showToast('success', `Empréstimo marcado como ${loanStatusLabel[status]}.`);
      await load();
    } catch (err) {
      showToast('error', err instanceof ApiError ? err.message : 'Erro ao atualizar.');
    } finally {
      setActionId(null);
    }
  }

  const filtered = loans.filter((loan) => {
    const matchStatus = !statusFilter || loan.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || loan.bookName.toLowerCase().includes(q) || loan.exemplarCode.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const pendingCount = loans.filter((l) => l.status === 'PENDING').length;

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestão de Empréstimos</h1>
          <p className="text-slate-500 mt-1">Aprove, rejeite e gerencie todos os empréstimos</p>
        </div>
        {pendingCount > 0 && (
          <span className="bg-amber-400 text-amber-900 text-sm font-bold px-4 py-2 rounded-full animate-pulse">
            {pendingCount} pendente{pendingCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium ${
          toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-3xl">
        <div className="flex flex-1 items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <input
            className="flex-1 outline-none text-sm text-slate-700 placeholder:text-slate-400 bg-transparent"
            placeholder="Buscar por livro ou código do exemplar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 shadow-sm">
          <SlidersHorizontal size={16} className="text-slate-400" />
          <select
            className="py-3 bg-transparent outline-none text-sm text-slate-700 cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as LoanStatus | '')}
          >
            <option value="">Todos os status</option>
            <option value="PENDING">Pendente</option>
            <option value="APPROVED">Aprovado</option>
            <option value="REJECTED">Recusado</option>
            <option value="RETURNED">Devolvido</option>
            <option value="OVERDUE">Atrasado</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {error}
        </div>
      )}

      {!loading && (
        <p className="text-sm text-slate-500 mb-4">
          {filtered.length} {filtered.length === 1 ? 'empréstimo' : 'empréstimos'}
        </p>
      )}

      {loading ? (
        <div className="grid gap-4 max-w-4xl">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 text-lg">Nenhum empréstimo encontrado.</p>
        </div>
      ) : (
        <ul className="grid gap-3 max-w-4xl">
          {filtered.map((loan) => (
            <li
              key={String(loan.id)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow"
            >
              {/* Book cover */}
              <div className="shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={loan.bookImage}
                  alt={loan.bookName}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x64/e2e8f0/94a3b8?text=📖'; }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-bold text-slate-800">{loan.bookName}</h2>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${loanStatusColor[loan.status] ?? 'bg-gray-100'}`}>
                    {loanStatusLabel[loan.status] ?? loan.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Exemplar: <strong className="text-slate-700">{loan.exemplarCode}</strong>
                  {' · '}
                  Solicitado: <strong className="text-slate-700">{new Date(loan.loan_date).toLocaleDateString('pt-BR')}</strong>
                  {loan.maturity_date && (
                    <> · Devolução: <strong className="text-slate-700">{new Date(loan.maturity_date).toLocaleDateString('pt-BR')}</strong></>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                {loan.status === 'PENDING' && (
                  <>
                    <button
                      type="button"
                      disabled={actionId === String(loan.id)}
                      onClick={() => handleAction(String(loan.id), 'APPROVED')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                    >
                      <CheckCircle size={14} />
                      Aprovar
                    </button>
                    <button
                      type="button"
                      disabled={actionId === String(loan.id)}
                      onClick={() => handleAction(String(loan.id), 'REJECTED')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                    >
                      <XCircle size={14} />
                      Rejeitar
                    </button>
                  </>
                )}
                {loan.status === 'APPROVED' && (
                  <button
                    type="button"
                    disabled={actionId === String(loan.id)}
                    onClick={() => handleAction(String(loan.id), 'RETURNED')}
                    className="flex items-center gap-1.5 px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    <RotateCcw size={14} />
                    {actionId === String(loan.id) ? 'Processando...' : 'Devolução'}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
