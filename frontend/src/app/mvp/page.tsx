import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const sections = [
  {
    title: '1.1 Usuários e autenticação',
    items: [
      { href: '/login', label: 'Login (JWT)', status: 'Integrado' },
      { href: '/cadastro', label: 'Cadastro de leitor', status: 'Integrado' },
      {
        href: '/admin/usuarios',
        label: 'Bibliotecários e listagem',
        status: 'Parcial',
      },
    ],
  },
  {
    title: '1.2 Livros e exemplares',
    items: [
      { href: '/catalogo', label: 'Catálogo (leitor)', status: 'Integrado' },
      { href: '/admin/livros', label: 'Cadastro de livros', status: 'Integrado' },
      {
        href: '/admin/exemplares',
        label: 'Cadastro de exemplares',
        status: 'Integrado',
      },
    ],
  },
  {
    title: '1.3 Empréstimos',
    items: [
      { href: '/emprestimos', label: 'Meus empréstimos', status: 'Integrado' },
      {
        href: '/admin/agendamentos',
        label: 'Aprovar / recusar',
        status: 'Integrado',
      },
      {
        href: '/admin/emprestimos',
        label: 'Devoluções e empréstimo direto',
        status: 'Lacuna API',
      },
    ],
  },
];

export default function MvpMapPage() {
  return (
    <div className="min-h-screen bg-background-home p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-blue-500" size={40} />
        <div>
          <h1 className="text-2xl font-bold">Mapa MVP — Fase 1</h1>
          <p className="text-gray-600 text-sm">
            Páginas do frontend alinhadas ao documento de requisitos
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <section
            key={section.title}
            className="bg-white rounded-2xl shadow-md p-5"
          >
            <h2 className="font-semibold text-lg mb-3">{section.title}</h2>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-blue-600">{item.label}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.status === 'Integrado'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'Parcial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-8">
        Lacunas documentadas em{' '}
        <code className="bg-gray-200 px-1 rounded">src/lib/api-placeholders.ts</code>
      </p>
    </div>
  );
}
