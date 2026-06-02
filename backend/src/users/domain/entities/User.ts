import { UserRole } from '@prisma/client';

export type CreateUserProps = {
  name: string;
  email: string;
  password_hash: string;
  role?: UserRole;
  count_loans?: number;
};

export interface CreateUserInput {
  name: string;
  email: string;
  password_hash: string;
  role?: UserRole;
  count_loans?: number;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password_hash?: string;
  role?: UserRole;
  count_loans?: number;
}

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password_hash: string,
    public role: UserRole,
    public count_loans: number,
  ) {}

  static create(props: CreateUserProps): User {
    return new User(
      crypto.randomUUID(),
      props.name,
      props.email,
      props.password_hash,
      props.role ?? UserRole.USER,
      props.count_loans ?? 0,
    );
  }
}
