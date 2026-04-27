import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ExemplaryPrismaRepository } from "./infra/database/ExemplaryPrismaRepository";
import { CreateExemplaryUseCase } from "./application/use-cases/Create";
import { FindAllExemplaryUseCase } from "./application/use-cases/FindAll";
import { FindByIdExemplaryUseCase } from "./application/use-cases/FindById";
import { UpdateExemplaryUseCase } from "./application/use-cases/Update";
import { DeleteExemplaryUseCase } from "./application/use-cases/Delete";
import { ExemplaryController } from "./controllers/exemplary.controller";

@Module({
    imports: [PrismaModule],
    controllers: [ExemplaryController],
    providers: [
        ExemplaryPrismaRepository,
        {
            provide: CreateExemplaryUseCase,
            useFactory: (repo: ExemplaryPrismaRepository) => new CreateExemplaryUseCase(repo),
            inject: [ExemplaryPrismaRepository],
        },
        {
            provide: FindAllExemplaryUseCase,
            useFactory: (repo: ExemplaryPrismaRepository) => new FindAllExemplaryUseCase(repo),
            inject: [ExemplaryPrismaRepository],
        },
        {
            provide: FindByIdExemplaryUseCase,
            useFactory: (repo: ExemplaryPrismaRepository) => new FindByIdExemplaryUseCase(repo),
            inject: [ExemplaryPrismaRepository],
        },
        {
            provide: UpdateExemplaryUseCase,
            useFactory: (repo: ExemplaryPrismaRepository) => new UpdateExemplaryUseCase(repo),
            inject: [ExemplaryPrismaRepository],
        },
        {
            provide: DeleteExemplaryUseCase,
            useFactory: (repo: ExemplaryPrismaRepository) => new DeleteExemplaryUseCase(repo),
            inject: [ExemplaryPrismaRepository],
        },
    ],
})
export class ExemplaryModule {}
