import { randomUUID } from "crypto";
import { ExemplaryStatus } from "src/enum/ExemplaryStatus";

export type CreateExemplaryProps = {
  book_id: string;
  code: string;
  status: ExemplaryStatus;
};

export type UpdateExemplaryProps = {
  book_id?: string;
  code?: string;
  status?: ExemplaryStatus;
};

export class Exemplary {
  constructor(
    public readonly id: string,
    public book_id: string,
    public code: string,
    public status: ExemplaryStatus,
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
