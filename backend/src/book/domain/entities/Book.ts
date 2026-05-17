export type CreateBookProps = {
    isbn: string;
    name: string;
    author: string;
    publisher: string;
    genre: string;
    year: number;
    image: string;
}

export type UpdateBookProps = {
    isbn?: string;
    name?: string;
    author?: string;
    publisher?: string;
    genre?: string;
    year?: number;
    image?: string;
}

export class Book {
  constructor(
    public readonly id: string,
    public isbn: string,
    public name: string,
    public author: string,
    public publisher: string,
    public genre: string,
    public year: number,
    public image: string,
  ) {}

  static create(props: CreateBookProps): Book {
    return new Book (
        crypto.randomUUID(),
        props.isbn,
        props.name,
        props.author,
        props.publisher,
        props.genre,
        props.year,
        props.image,
    )
  }

}
