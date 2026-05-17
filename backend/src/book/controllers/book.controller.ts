import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CreateBookUseCase } from "src/book/application/use-cases/Create";
import { FindAllBooksUseCase } from "src/book/application/use-cases/FindAll";
import { FindByIdBooksUseCase } from "src/book/application/use-cases/FindById";
import { FindByIsbnBooksUseCase } from "src/book/application/use-cases/FindByIsbn";
import { UpdateBookUseCase } from "src/book/application/use-cases/Update";
import { DeleteBookUseCase } from "src/book/application/use-cases/Delete";
import { CreateBookDto } from "../dto/CreateBookDto";
import { UpdateBookDto } from "../dto/UpdateBookDto";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/enum/role";

@Controller('book')
export class BookController {
    constructor(
        private readonly createBookUseCase: CreateBookUseCase,
        private readonly findAllBooksUseCase: FindAllBooksUseCase,
        private readonly findByIdBooksUseCase: FindByIdBooksUseCase,
        private readonly findByIsbnBooksUseCase: FindByIsbnBooksUseCase,
        private readonly updateBookUseCase: UpdateBookUseCase,
        private readonly deleteBookUseCase: DeleteBookUseCase,
    ) {}

    @Roles(Role.admin)
    @Post()
    async create(@Body() data: CreateBookDto) {
        return this.createBookUseCase.execute(data);
    }

    @Roles(Role.admin, Role.user)
    @Get()
    async findAll() {
        return this.findAllBooksUseCase.execute();
    }

    @Roles(Role.admin, Role.user)
    @Get('isbn/:isbn')
    async findByIsbn(@Param('isbn') isbn: string) {
        return this.findByIsbnBooksUseCase.execute(isbn);
    }

    @Roles(Role.admin, Role.user)
    async findById(@Param('id') id: string) {
        return this.findByIdBooksUseCase.execute(id);
    }

    @Roles(Role.admin)
    async update(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.updateBookUseCase.execute(id, data);
    }

    @Roles(Role.admin)
    async remove(@Param('id') id: string) {
        return this.deleteBookUseCase.execute(id);
    }
}
