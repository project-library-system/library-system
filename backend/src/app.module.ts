import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ExemplaryModule } from './exemplary/exemplary.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { BookModule } from './book/book.module';
import { LoanModule } from './loan/loan.module';

@Module({
  imports: [PrismaModule, AuthModule, ExemplaryModule, BookModule, LoanModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
