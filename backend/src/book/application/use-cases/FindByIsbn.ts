import { Book } from "src/book/domain/entities/Book";
import { BookRepository } from "src/book/domain/repositories/BookRepository";

export class FindByIsbnBooksUseCase {
    constructor(
        private readonly bookRepository: BookRepository
    ) {}

    async execute(isbn: string): Promise<Book> {
        
        const book = await this.bookRepository.findByIsbn(isbn);

        if(!book) {
            throw new Error('Book Not Found');
        }

        return book;
    }
}