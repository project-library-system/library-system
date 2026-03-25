import {
  Controller,
  Delete,
  Get,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DeleteUseCase } from '../application/use-cases/Delete';
import { FindAllUseCase } from '../application/use-cases/FindAll';
import { FindByIdUseCase } from '../application/use-cases/FindById';
import { FindByEmailUseCase } from '../application/use-cases/FindByEmail';
import { UpdateUserUseCase } from '../application/use-cases/Update';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly deleteUser: DeleteUseCase,
    private readonly findAll: FindAllUseCase,
    private readonly findById: FindByIdUseCase,
    private readonly findByEmail: FindByEmailUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  @Delete('id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.deleteUser.execute(id);
  }

  @Get()
  async findAllUsers() {
    return await this.findAll.execute();
  }

  @Get('id')
  async findByIdUsers(@Param('id', ParseUUIDPipe) id: string) {
    return await this.findById.execute(id);
  }

  @Get('email/:email')
  async findByIdEmailUsers(@Param('email') email: string) {
    return await this.findByEmail.execute(email);
  }

  @Put('id')
  async Update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return await this.updateUser.execute(id, data);
  }
}
