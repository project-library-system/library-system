import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CreateExemplaryUseCase } from "src/exemplary/application/use-cases/Create";
import { FindAllExemplaryUseCase } from "src/exemplary/application/use-cases/FindAll";
import { FindByIdExemplaryUseCase } from "src/exemplary/application/use-cases/FindById";
import { UpdateExemplaryUseCase } from "src/exemplary/application/use-cases/Update";
import { DeleteExemplaryUseCase } from "src/exemplary/application/use-cases/Delete";
import { CreateExemplaryDto } from "../dto/CreateExemplaryDto";
import { UpdateExemplaryDto } from "../dto/UpdateExemplaryDto";

@Controller('exemplary')
export class ExemplaryController {
    constructor(
        private readonly createExemplaryUseCase: CreateExemplaryUseCase,
        private readonly findAllExemplaryUseCase: FindAllExemplaryUseCase,
        private readonly findByIdExemplaryUseCase: FindByIdExemplaryUseCase,
        private readonly updateExemplaryUseCase: UpdateExemplaryUseCase,
        private readonly deleteExemplaryUseCase: DeleteExemplaryUseCase,
    ) {}

    @Post()
    async create(@Body() data: CreateExemplaryDto) {
        return this.createExemplaryUseCase.execute(data);
    }

    @Get()
    async findAll() {
        return this.findAllExemplaryUseCase.execute();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.findByIdExemplaryUseCase.execute(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateExemplaryDto) {
        return this.updateExemplaryUseCase.execute(id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.deleteExemplaryUseCase.execute(id);
    }
}
