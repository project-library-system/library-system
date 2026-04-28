import { Module } from "@nestjs/common";
import { LoanController } from "./controllers/Loan.controller";
import { LoanPrismaRepository } from "./infra/database/LoanPrismaRepository";
import { CreateLoanUseCase } from "./application/use-cases/Create";
import { FindAllLoanUseCase } from "./application/use-cases/FindAll";
import { FindByIdLoanUseCase } from "./application/use-cases/FindById";
import { FindByExemplaryUseCase } from "./application/use-cases/FindByExemplary";
import { FindByUserIdUseCase } from "./application/use-cases/FindByUserId";
import { UpdateLoanUseCase } from "./application/use-cases/Update";
import { DeleteLoanUseCase } from "./application/use-cases/Delete";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [],
    controllers: [LoanController],
    providers: [
        PrismaService,
        LoanPrismaRepository,
        CreateLoanUseCase,
        FindAllLoanUseCase,
        FindByIdLoanUseCase,
        FindByExemplaryUseCase,
        FindByUserIdUseCase,
        UpdateLoanUseCase,
        DeleteLoanUseCase,
        {
            provide: 'LoanRepository',
            useClass: LoanPrismaRepository,
        },
    ],
})
export class LoanModule {}