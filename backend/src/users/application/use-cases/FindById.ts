import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/infra/database/UserPrismaRepository';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly useRepository: UserPrismaRepository) {}

  async execute(id: string) {
    const user = await this.useRepository.findById(id);
    return user;
  }
}
