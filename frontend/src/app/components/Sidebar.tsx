'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Book, Handshake, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';

const links = [
  { href: '/catalogo', label: 'Catálogo', icon: Book },
  { href: '/emprestimos', label: 'Meus Empréstimos', icon: Handshake },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-menu-lateral flex flex-col shadow-xl">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2 py-8 px-4 border-b border-white/10">
        <div className="bg-blue-500 rounded-xl p-3">
          <BookOpen size={28} className="text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Biblioteca</span>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Área do Usuário</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 mt-2">
        <ul className="flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    active
                      ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all"
        >
          <LogOut size={18} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
