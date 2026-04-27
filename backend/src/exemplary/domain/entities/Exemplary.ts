import { randomUUID } from "crypto";

export type CreateExemplaryProps = {
  book_id: string;
  code: string;
  status: string;
};

export type UpdateExemplaryProps = {
  book_id?: string;
  code?: string;
  status?: string;
};

export class Exemplary {
  constructor(
    public readonly id: string,
    public book_id: string,
    public code: string,
    public status: string,
    public readonly created_at: Date
  ) {}

  static create(props: CreateExemplaryProps): Exemplary {
    return new Exemplary(
      randomUUID(),
      props.book_id,
      props.code,
      props.status,
      new Date()
    );
  }
}
