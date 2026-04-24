export type CreateBookProps = {
    isbn: string;
    name: string;
    author: string;
    publisher: string;
}

export type UpdateBookProps = {
    isbn?: string;
    name?: string;
    author?: string;
    publisher?: string;
}

export class Book {
  constructor(
    public readonly id: string,
    public isbn: string,
    public name: string,
    public author: string,
    public publisher: string,
  ) {}

  static create(props: CreateBookProps): Book {
    return new Book (
        crypto.randomUUID(),
        props.isbn,
        props.name,
        props.author,
        props.publisher,
    )
  }

}
