import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookPrismaRepository } from './infra/database/BookPrismaRepository';
import { UpdateBookUseCase } from './application/use-cases/Update';
import { DeleteBookUseCase } from './application/use-cases/Delete';
import { FindAllBooksUseCase } from './application/use-cases/FindAll';
import { FindByIdBooksUseCase } from './application/use-cases/FindById';
import { BookController } from './controllers/book.controller';
import { CreateBookUseCase } from './application/use-cases/Create';
import { FindByIsbnBooksUseCase } from './application/use-cases/FindByIsbn';

@Module({
  imports: [PrismaModule],
  controllers: [BookController],
  providers: [
    {
      provide: 'BookRepository',
      useClass: BookPrismaRepository,
    },
    UpdateBookUseCase,
    DeleteBookUseCase,
    FindAllBooksUseCase,
    FindByIdBooksUseCase,
    CreateBookUseCase,
    FindByIsbnBooksUseCase,
  ],
  exports: ['BookRepository'],
})
export class BookModule { }
