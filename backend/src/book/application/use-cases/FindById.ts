import { Book } from "src/book/domain/entities/Book";
import { BookRepository } from "src/book/domain/repositories/BookRepository";

export class FindByIdBooksUseCase {
    constructor(
        private readonly bookRepository: BookRepository
    ) {}

    async execute(id: string): Promise<Book> {
        
        const book = await this.bookRepository.findById(id);

        if(!book) {
            throw new Error('Book Not Found');
        }

        return book;
    }
}