import { UserRepository } from 'src/users/domain/repositories/UserRepository';
import { UpdateUserInput, User } from 'src/users/domain/entities/User';

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return this.userRepository.update(id, data);
  }
}
