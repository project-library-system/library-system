import { Controller, Post, Get, Param, Put, Delete, Body, Req } from "@nestjs/common";
import { CreateLoanUseCase } from "../application/use-cases/Create";
import { FindAllLoanUseCase } from "../application/use-cases/FindAll";
import { FindByIdLoanUseCase } from "../application/use-cases/FindById";
import { FindByExemplaryUseCase } from "../application/use-cases/FindByExemplary";
import { FindByUserIdUseCase } from "../application/use-cases/FindByUserId";
import { UpdateLoanUseCase } from "../application/use-cases/Update";
import { DeleteLoanUseCase } from "../application/use-cases/Delete";
import { CreateLoanDto, UpdateLoanDto } from "../dto/loan.dto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "@prisma/client";

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

    @Roles(UserRole.ADMIN, UserRole.USER)
    @Post()
    async create(@Body() createLoanDto: CreateLoanDto, @Req() req) {
        if(req.user.role !== UserRole.ADMIN) {
            createLoanDto.user_id = req.user.sub;
        }
        return this.createLoanUseCase.execute(createLoanDto);
    }

    @Roles(UserRole.ADMIN)
    @Get()
    async findAll() {
        return this.findAllLoanUseCase.execute();
    }


    @Roles(UserRole.ADMIN)
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.findByIdLoanUseCase.execute(id);
    }

    @Roles(UserRole.ADMIN)
    @Get('exemplary/:exemplary_id')
    async findByExemplaryId(@Param('exemplary_id') exemplary_id: string) {
        return this.findByExemplaryUseCase.execute(exemplary_id);
    }

    @Roles(UserRole.ADMIN, UserRole.USER)
    @Get('user/me')
    async findMyLoans(@Req() req) {
        const userId = req.user.sub;
        return this.findByUserIdUseCase.execute(userId);
    }

    @Roles(UserRole.ADMIN)
    @Get('user/:user_id')
    async findByUserId(@Param('user_id') user_id: string) {
        return this.findByUserIdUseCase.execute(user_id);
    }

    @Roles(UserRole.ADMIN)
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
        return this.updateLoanUseCase.execute(id, updateLoanDto);
    }

    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.deleteLoanUseCase.execute(id);
    }
}
