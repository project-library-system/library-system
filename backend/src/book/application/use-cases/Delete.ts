import { Inject } from "@nestjs/common";
import { BookRepository } from "src/book/domain/repositories/BookRepository";

export class DeleteBookUseCase {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: BookRepository
    ) {}

    async execute(id: string): Promise<void> {

        const book = await this.bookRepository.findById(id);

        if(!book) {
            throw new Error('Book not found');
        }

        await this.bookRepository.delete(id);
    }
}