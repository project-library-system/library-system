import { Inject, Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/infra/database/UserPrismaRepository';

@Injectable()
export class FindByIdUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly useRepository: UserPrismaRepository,
  ) {}

  async execute(id: string) {
    const user = await this.useRepository.findById(id);
    return user;
  }
}
