import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserPrismaRepository } from './infra/database/UserPrismaRepository';
import { UpdateUserUseCase } from './application/use-cases/Update';
import { UserController } from './controllers/user.controller';
import { DeleteUseCase } from './application/use-cases/Delete';
import { FindAllUseCase } from './application/use-cases/FindAll';
import { FindByIdUseCase } from './application/use-cases/FindById';
import { FindByEmailUseCase } from './application/use-cases/FindByEmail';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },
    UpdateUserUseCase,
    DeleteUseCase,
    FindAllUseCase,
    FindByIdUseCase,
    FindByEmailUseCase,
  ],
  exports: ['UserRepository'],
})
export class UsersModule {}
