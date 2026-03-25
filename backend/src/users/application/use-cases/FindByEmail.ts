import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from 'src/users/infra/database/UserPrismaRepository';

@Injectable()
export class FindByEmailUseCase {
  constructor(private readonly useRepository: UserPrismaRepository) {}

  async execute(email: string) {
    const user = await this.useRepository.findByEmail(email);
    return user;
  }
}
