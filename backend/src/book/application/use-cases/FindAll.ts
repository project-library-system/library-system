import { Book } from "src/book/domain/entities/Book";
import { BookRepository } from "src/book/domain/repositories/BookRepository";

export class FindAllBooksUseCase {
    constructor(
        private readonly bookRepository: BookRepository
    ) {}

    async execute(): Promise<Book[]> {
        
        const books = await this.bookRepository.findAll();

        if(!books) {
            throw new Error('Books Not Found');
        }

        return books;
    }
}