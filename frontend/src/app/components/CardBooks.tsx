'use client';

import type { BookCatalogItem } from '@/types';

interface CardBooksProps {
  book: BookCatalogItem;
  onRequest: (bookId: string) => void;
  requesting?: boolean;
}

export default function CardBooks({ book, onRequest, requesting }: CardBooksProps) {
  return (
    <div className="w-64 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Cover */}
      <div className="bg-slate-100 flex justify-center items-center h-60 overflow-hidden">
        <img
          src={book.image || '/placeholder-book.png'}
          alt={book.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/256x240/e2e8f0/94a3b8?text=Livro';
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs font-semibold text-blue-500 uppercase tracking-wide">{book.genre}</span>
        <h2 className="text-base font-bold text-slate-800 mt-1 line-clamp-2 leading-snug">{book.name}</h2>
        <p className="text-sm text-slate-500 mt-1">{book.author}</p>
        <p className="text-xs text-slate-400 mt-1">{book.publisher} · {book.year}</p>

        <button
          type="button"
          disabled={requesting}
          onClick={() => onRequest(book.id)}
          className="mt-auto pt-4"
        >
          <span className={`block w-full text-center text-sm font-semibold py-2.5 rounded-xl transition-all ${
            requesting
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md'
          }`}>
            {requesting ? 'Solicitando...' : 'Solicitar Empréstimo'}
          </span>
        </button>
      </div>
    </div>
  );
}
