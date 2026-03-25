import { Inject, Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/infra/database/UserPrismaRepository';

@Injectable()
export class FindAllUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserPrismaRepository,
  ) {}

  async execute() {
    const users = await this.userRepository.findAll();
    return users ?? [];
  }
}
