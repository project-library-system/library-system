import {
  Controller,
  Delete,
  Get,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { DeleteUseCase } from '../application/use-cases/Delete';
import { FindAllUseCase } from '../application/use-cases/FindAll';
import { FindByIdUseCase } from '../application/use-cases/FindById';
import { FindByEmailUseCase } from '../application/use-cases/FindByEmail';
import { UpdateUserUseCase } from '../application/use-cases/Update';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(
    private readonly deleteUser: DeleteUseCase,
    private readonly findAll: FindAllUseCase,
    private readonly findById: FindByIdUseCase,
    private readonly findByEmail: FindByEmailUseCase,
    private readonly updateUser: UpdateUserUseCase,
  ) {}

  @Roles(UserRole.ADMIN)
  @Delete('id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.deleteUser.execute(id);
  }

  @Roles(UserRole.ADMIN)
  @Get()
  async findAllUsers() {
    return await this.findAll.execute();
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('id')
  async findByIdUsers(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    if(req.user.role !== UserRole.ADMIN) {
      id = req.user.sub;
    }
    return await this.findById.execute(id);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get('email/:email')
  async findByIdEmailUsers(@Param('email') email: string, @Req() req) {
    if(req.user.role !== UserRole.ADMIN) {
      email = req.user.email;
    }
    return await this.findByEmail.execute(email);
  }

  @Roles(UserRole.ADMIN, UserRole.USER)
  @Put('id')
  async Update(@Param('id') id: string, @Body() data: UpdateUserDto, @Req() req) {
    if(req.user.role !== UserRole.ADMIN) {
      id = req.user.sub;
    }
    return await this.updateUser.execute(id, data);

  }
}
