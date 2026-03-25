/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/enum/role';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password_hash?: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
