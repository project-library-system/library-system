import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CreateBookUseCase } from "src/book/application/use-cases/Create";
import { FindAllBooksUseCase } from "src/book/application/use-cases/FindAll";
import { FindByIdBooksUseCase } from "src/book/application/use-cases/FindById";
import { FindByIsbnBooksUseCase } from "src/book/application/use-cases/FindByIsbn";
import { UpdateBookUseCase } from "src/book/application/use-cases/Update";
import { DeleteBookUseCase } from "src/book/application/use-cases/Delete";
import { CreateBookDto } from "../dto/CreateBookDto";
import { UpdateBookDto } from "../dto/UpdateBookDto";

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

    @Post()
    async create(@Body() data: CreateBookDto) {
        return this.createBookUseCase.execute(data);
    }

    @Get()
    async findAll() {
        return this.findAllBooksUseCase.execute();
    }

    @Get('isbn/:isbn')
    async findByIsbn(@Param('isbn') isbn: string) {
        return this.findByIsbnBooksUseCase.execute(isbn);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.findByIdBooksUseCase.execute(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateBookDto) {
        return this.updateBookUseCase.execute(id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.deleteBookUseCase.execute(id);
    }
}
