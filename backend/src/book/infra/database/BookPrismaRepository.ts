import { BookRepository } from "src/book/domain/repositories/BookRepository";
import { PrismaService } from "src/prisma/prisma.service";
import { Book, CreateBookProps, UpdateBookProps } from "src/book/domain/entities/Book";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BookPrismaRepository implements BookRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async create(data: CreateBookProps): Promise<Book> {
        const bookEntity = Book.create(data);
        const createdBook = await this.prisma.book.create({
            data: {
                id: bookEntity.id,
                isbn: bookEntity.isbn,
                name: bookEntity.name,
                author: bookEntity.author,
                publisher: bookEntity.publisher,
                genre: bookEntity.genre,
                year: bookEntity.year,
                image: bookEntity.image,
            }
        });
        return new Book(createdBook.id, createdBook.isbn, createdBook.name, createdBook.author, createdBook.publisher, createdBook.genre, createdBook.year, createdBook.image);
    }
    
    async findById(id: string): Promise<Book | null> {
        const book = await this.prisma.book.findUnique({ where: { id } });
        if (!book) return null;
        return new Book(book.id, book.isbn, book.name, book.author, book.publisher, book.genre, book.year, book.image);
    }

    async findByIsbn(isbn: string): Promise<Book | null> {
        const book = await this.prisma.book.findUnique({ where: { isbn } });

        if (!book) return null;

        return new Book(book.id, book.isbn, book.name, book.author, book.publisher, book.genre, book.year, book.image);
    }

    async findAll(): Promise<Book[]> {
        const books = await this.prisma.book.findMany();
        return books.map(book => new Book(book.id, book.isbn, book.name, book.author, book.publisher, book.genre, book.year, book.image));
    }

    async update(id: string, data: UpdateBookProps): Promise<Book> {
        const updatedBook = await this.prisma.book.update({
            where: { id },
            data: {
                isbn: data.isbn,
                name: data.name,
                author: data.author,
                publisher: data.publisher,
                genre: data.genre,
                year: data.year,
                image: data.image,
            }
        });
        return new Book(updatedBook.id, updatedBook.isbn, updatedBook.name, updatedBook.author, updatedBook.publisher, updatedBook.genre, updatedBook.year, updatedBook.image);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.book.delete({ where: { id } });
    }
}