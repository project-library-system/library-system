'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  Book,
  Layers,
  Handshake,
  Users,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';

const links: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}[] = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard, exact: true },
  { href: '/admin/emprestimos', label: 'Empréstimos', icon: Handshake },
  { href: '/admin/livros', label: 'Livros', icon: Book },
  { href: '/admin/exemplares', label: 'Exemplares', icon: Layers },
  { href: '/admin/usuarios', label: 'Usuários', icon: Users },
];

export default function SidebarAdmin() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-menu-lateral flex flex-col shadow-xl">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2 py-8 px-4 border-b border-white/10">
        <div className="bg-indigo-500 rounded-xl p-3">
          <BookOpen size={28} className="text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">Biblioteca</span>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-widest">Administração</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 mt-2 overflow-y-auto">
        <ul className="flex flex-col gap-1">
          {links.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    active
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
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
