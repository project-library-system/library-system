import { BookOpen, Mail, Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-home">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-500 p-4 rounded-full mb-4">
            <BookOpen size={42} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold">
            Biblioteca
          </h1>

          <p className="text-gray-500 mt-2">
            Faça login para acessar o painel
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-2 focus-within:border-blue-500">

              <Mail size={20} className="text-gray-400" />

              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Senha */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Senha
            </label>

            <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-2 focus-within:border-blue-500">

              <Lock size={20} className="text-gray-400" />

              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Esqueci senha */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
            >
              Esqueceu sua senha?
            </button>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-xl"
          >
            Entrar
          </button>
        </form>

      </div>
    </div>
  );
}