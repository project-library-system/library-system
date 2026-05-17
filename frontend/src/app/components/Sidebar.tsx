import {
  BookOpen,
  Book,
  User,
  Handshake,
  LogOut,
  Calendar,
  ChartBar
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-50 h-screen w-64 bg-menu-lateral border-r border-gray-200 p-4 shadow-sm">

      {/* Logo */}
      <div className="flex flex-col items-center gap-2 py-6">
        <BookOpen size={60} className="text-blue-500" />

        <span className="text-2xl font-bold">
          Biblioteca
        </span>
      </div>

      <hr className="mb-5" />

      {/* Menu */}
      <nav>
        <ul className="flex flex-col gap-2">

          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <Book size={20} />
            <span>Catálogo de Livros</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <Handshake size={20} />
            <span>Meus Empréstimos</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-red-500 hover:text-white mt-5">
            <LogOut size={20} />
            <span>Sair</span>
          </li>

        </ul>
      </nav>
    </aside>
  );
}