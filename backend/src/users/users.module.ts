import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPrismaRepository } from './infra/database/UserPrismaRepository';
import { UpdateUserUseCase } from './application/use-cases/Update';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    UpdateUserUseCase,
  ],
  exports: [UserPrismaRepository],
  imports: [PrismaModule],
})
export class UsersModule {}
