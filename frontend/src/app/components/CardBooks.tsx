'use client';

import type { BookCatalogItem } from '@/types';

interface CardBooksProps {
  book: BookCatalogItem;
  onRequest: (bookId: string) => void;
  requesting?: boolean;
  totalExemplars: number;
  availableExemplars: number;
}

export default function CardBooks({
  book,
  onRequest,
  requesting,
  totalExemplars,
  availableExemplars,
}: CardBooksProps) {
  const isUnavailable = totalExemplars === 0 || availableExemplars === 0;

  return (
    <div className="w-64 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
      {/* Cover */}
      <div className="bg-slate-100 flex justify-center items-center h-60 overflow-hidden relative">
        <img
          src={book.image || '/placeholder-book.png'}
          alt={book.name}
          className={`h-full w-full object-cover transition-all duration-300 ${
            isUnavailable ? 'blur-[3px] grayscale opacity-75' : ''
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/256x240/e2e8f0/94a3b8?text=Livro';
          }}
        />
        {isUnavailable && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              {totalExemplars === 0 ? 'Sem exemplares' : 'Indisponível'}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-1">
          <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide truncate max-w-[100px]">{book.genre}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
            totalExemplars === 0 
              ? 'bg-red-50 text-red-600 border border-red-100'
              : availableExemplars === 0
                ? 'bg-amber-50 text-amber-600 border border-amber-100'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
          }`}>
            {totalExemplars === 0 
              ? '0 exemplares' 
              : `${availableExemplars} de ${totalExemplars} disponível`}
          </span>
        </div>
        <h2 className="text-base font-bold text-slate-800 mt-1.5 line-clamp-2 leading-snug">{book.name}</h2>
        <p className="text-sm text-slate-500 mt-1">{book.author}</p>
        <p className="text-xs text-slate-400 mt-1">{book.publisher} · {book.year}</p>

        <button
          type="button"
          disabled={requesting || isUnavailable}
          onClick={() => onRequest(book.id)}
          className="mt-auto pt-4"
        >
          <span className={`block w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-all ${
            requesting
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : isUnavailable
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
          }`}>
            {requesting ? 'Solicitando...' : isUnavailable ? 'Indisponível' : 'Solicitar Empréstimo'}
          </span>
        </button>
      </div>
    </div>
  );
}
