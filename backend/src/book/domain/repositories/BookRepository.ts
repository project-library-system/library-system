import { Book, CreateBookProps, UpdateBookProps } from "../entities/Book";

export interface BookRepository {
    create(data: CreateBookProps): Promise<Book>;
    findById(id: string): Promise<Book | null>;
    findByIsbn(isbn: string): Promise<Book | null>;
    findAll(): Promise<Book[]>;
    update(id: string, data: UpdateBookProps): Promise<Book>;
    delete(id: string): Promise<void>;
}