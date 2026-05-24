import { Inject } from "@nestjs/common";
import { Book, UpdateBookProps } from "src/book/domain/entities/Book";
import { BookRepository } from "src/book/domain/repositories/BookRepository";

export class UpdateBookUseCase {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: BookRepository
    ) {}

    async execute(id: string, data: UpdateBookProps): Promise<Book> {
        
        const book = await this.bookRepository.findById(id);

        if(!book) {
            throw new Error('Book Not Found');
        }

        data.isbn = data.isbn || book.isbn; 
        data.name = data.name || book.name;
        data.author = data.author || book.author;
        data.publisher = data.publisher || book.publisher;
        data.genre = data.genre || book.genre;
        data.year = data.year || book.year;
        data.image = data.image || book.image;

        return this.bookRepository.update(id, data);
    }
}