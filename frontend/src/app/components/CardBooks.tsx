interface CardBooksProps {
  title: string;
  author: string;
  genre: string;
  year: number;
  image: string;
}

export default function CardBooks({ title, author, genre, year, image }: CardBooksProps) {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-md overflow-hidden hover:scale-105 transition duration-300 mt-10">

      {/* Imagem */}
      <div className="bg-gray-100 flex justify-center items-center p-4">
        <img
          src={image}
          alt={title}
          className="h-56 object-contain"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800">
          Dom Casmurro
        </h2>

        <div className="mt-3 flex flex-col gap-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold">
              Autor:
            </span>{" "}
            Machado de Assis
          </p>

          <p>
            <span className="font-semibold">
              Gênero:
            </span>{" "}
            Romance
          </p>

          <p>
            <span className="font-semibold">
              Ano:
            </span>{" "}
            1899
          </p>
        </div>

        {/* Botão */}
        <button className="w-full mt-5 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold py-3 rounded-xl">
          Agendar
        </button>
      </div>
    </div>
  );
}