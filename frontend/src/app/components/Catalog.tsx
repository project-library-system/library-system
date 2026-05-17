import { Search } from "lucide-react";
import CardBooks from "./CardBooks";

export default function Catalog() {

    const livros = [
        {
            id: 1,
            titulo: "Dom Casmurro",
            autor: "Machado de Assis",
            genero: "Romance",
            ano: 1899,
            imagem:
                "https://editoravalentina.com.br/assets/img/livro/mockup-3d1.png"
        },

        {
            id: 2,
            titulo: "1984",
            autor: "George Orwell",
            genero: "Ficção",
            ano: 1949,
            imagem:
                "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg"
        },

        {
            id: 3,
            titulo: "O Hobbit",
            autor: "J.R.R Tolkien",
            genero: "Fantasia",
            ano: 1937,
            imagem:
                "https://m.media-amazon.com/images/I/91M9xPIf10L.jpg"
        }
    ];

    return (
        <div className="w-screen ml-64 min-h-screen p-8 gap-2">
            <h1 className="text-3xl font-bold">
                Catálogo de Livros
            </h1>
            <p className="text-gray-500">
                Encontre e agende livros disponíveis
            </p>
            <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 mt-5 focus-within:border-blue-500">
                    <Search size={20} className="text-gray-400" />
                    <input className="ml-2 outline-none" type="text" placeholder="Digite o nome do livro" />
                </div>
            </div>

            {/* Cards */}
            <div className="flex flex-wrap gap-6 mt-8">

                {livros.map((livro) => (
                    <CardBooks
                        key={livro.id}
                        title={livro.titulo}
                        author={livro.autor}
                        genre={livro.genero}
                        year={livro.ano}
                        image={livro.imagem}
                    />
                ))}

            </div>


        </div>
    );
}