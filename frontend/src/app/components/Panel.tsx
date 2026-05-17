import {
  BookOpen,
  Users,
  Handshake,
  Calendar
} from "lucide-react";

export default function Panel() {
  return (
    <main className="w-screen ml-64 min-h-screen p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Bem-vindo ao Painel Administrativo!
        </h1>

        <p className="text-gray-500 mt-2">
          Gerencie livros, usuários e empréstimos da biblioteca.
        </p>
      </div>

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Card */}
        <div className="bg-blue-500 rounded-2xl p-5 text-white shadow-md hover:scale-105 transition hover:bg-blue-600">

          <div className="flex justify-between items-center">
            <BookOpen size={42} />

            <span className="text-4xl font-bold">
              10
            </span>
          </div>

          <p className="mt-6 text-lg font-semibold">
            Total de Livros
          </p>
        </div>

        {/* Card */}
        <div className="bg-blue-500 rounded-2xl p-5 text-white shadow-md hover:scale-105 transition hover:bg-blue-600">

          <div className="flex justify-between items-center">
            <Users size={42} />

            <span className="text-4xl font-bold">
              10
            </span>
          </div>

          <p className="mt-6 text-lg font-semibold">
            Total de Usuários
          </p>
        </div>

        {/* Card */}
        <div className="bg-blue-500 rounded-2xl p-5 text-white shadow-md hover:scale-105 transition hover:bg-blue-600">

          <div className="flex justify-between items-center">
            <Handshake size={42} />

            <span className="text-4xl font-bold">
              10
            </span>
          </div>

          <p className="mt-6 text-lg font-semibold">
            Total de Empréstimos
          </p>
        </div>

        {/* Card */}
        <div className="bg-blue-500 rounded-2xl p-5 text-white shadow-md hover:scale-105 transition hover:bg-blue-600">

          <div className="flex justify-between items-center">
            <Calendar size={42} />

            <span className="text-4xl font-bold">
              10
            </span>
          </div>

          <p className="mt-6 text-lg font-semibold">
            Total de Agendamentos
          </p>
        </div>

      </section>
    </main>
  );
}