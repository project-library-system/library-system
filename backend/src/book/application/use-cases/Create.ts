import { Inject } from "@nestjs/common";
import { Book, CreateBookProps } from "src/book/domain/entities/Book";
import { BookRepository } from "src/book/domain/repositories/BookRepository";

export class CreateBookUseCase {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: BookRepository
    ) {}

    async execute(data: CreateBookProps): Promise<Book> {

        const existingBook = await this.bookRepository.findByIsbn(data.isbn);

        if(existingBook) {
            throw new Error('Book already exists');
        }

        return this.bookRepository.create(data);
    }
}
