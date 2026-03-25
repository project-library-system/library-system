import { Role } from 'src/enum/role';

export type CreateUserProps = {
  name: string;
  email: string;
  password_hash: string;
  role: Role;
};

export interface CreateUserInput {
  name: string;
  email: string;
  password_hash: string;
  role: Role;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  password_hash?: string;
  role?: Role;
}

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password_hash: string,
    public role: Role,
  ) {}

  static create(props: CreateUserProps): User {
    return new User(
      crypto.randomUUID(),
      props.name,
      props.email,
      props.password_hash,
      props.role,
    );
  }
}
