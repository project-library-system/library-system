import {
  BookOpen,
  Book,
  User,
  LogOut,
  Calendar,
  ChartBar
} from "lucide-react";

export default function SidebarAdmin() {
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
            <ChartBar size={20} />
            <span>Painel</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <Book size={20} />
            <span>Livros</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <User size={20} />
            <span>Usuários</span>
          </li>

          <li className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-blue-500 hover:text-white">
            <Calendar size={20} />
            <span>Agendamentos</span>
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