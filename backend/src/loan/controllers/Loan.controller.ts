import { Controller, Post, Get, Param, Put, Delete, Body } from "@nestjs/common";
import { CreateLoanUseCase } from "../application/use-cases/Create";
import { FindAllLoanUseCase } from "../application/use-cases/FindAll";
import { FindByIdLoanUseCase } from "../application/use-cases/FindById";
import { FindByExemplaryUseCase } from "../application/use-cases/FindByExemplary";
import { FindByUserIdUseCase } from "../application/use-cases/FindByUserId";
import { UpdateLoanUseCase } from "../application/use-cases/Update";
import { DeleteLoanUseCase } from "../application/use-cases/Delete";
import { CreateLoanDto, UpdateLoanDto } from "../dto/loan.dto";

@Controller('loan')
export class LoanController {
    constructor(
        private readonly createLoanUseCase: CreateLoanUseCase,
        private readonly findAllLoanUseCase: FindAllLoanUseCase,
        private readonly findByIdLoanUseCase: FindByIdLoanUseCase,
        private readonly findByExemplaryUseCase: FindByExemplaryUseCase,
        private readonly findByUserIdUseCase: FindByUserIdUseCase,
        private readonly updateLoanUseCase: UpdateLoanUseCase,
        private readonly deleteLoanUseCase: DeleteLoanUseCase,
    ) {}

    @Post()
    async create(@Body() createLoanDto: CreateLoanDto) {
        return this.createLoanUseCase.execute(createLoanDto);
    }

    @Get()
    async findAll() {
        return this.findAllLoanUseCase.execute();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.findByIdLoanUseCase.execute(id);
    }

    @Get('exemplary/:exemplary_id')
    async findByExemplaryId(@Param('exemplary_id') exemplary_id: string) {
        return this.findByExemplaryUseCase.execute(exemplary_id);
    }

    @Get('user/:user_id')
    async findByUserId(@Param('user_id') user_id: string) {
        return this.findByUserIdUseCase.execute(user_id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
        return this.updateLoanUseCase.execute(id, updateLoanDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteLoanUseCase.execute(id);
    }
}
