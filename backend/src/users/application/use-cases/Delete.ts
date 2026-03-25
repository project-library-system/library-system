import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/infra/database/UserPrismaRepository';

@Injectable()
export class DeleteUseCase {
  constructor(private readonly useRepository: UserPrismaRepository) {}

  async execute(id: string) {
    await this.useRepository.delete(id);
  }
}
