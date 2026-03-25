import { UpdateUserInput, User } from 'src/users/domain/entities/User';
import { Inject } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/infra/database/UserPrismaRepository';

export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private userRepository: UserPrismaRepository,
  ) {}

  async execute(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return this.userRepository.update(id, data);
  }
}
