import { UpdateUserInput, User } from '../../domain/entities/User';
import { PrismaService } from '../../../prisma/prisma.service';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from 'generated/prisma';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    const data: Prisma.UserCreateInput = {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
      role: user.role as unknown as UserRole,
    };
    const createdUser = await this.prisma.user.create({ data });

    return createdUser as unknown as User;
  }

  async findById(id: string): Promise<User | null> {
    const data = await (this.prisma.user.findUnique({
      where: { id },
    }) as Promise<User | null>);
    return data;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await (this.prisma.user.findUnique({
      where: { email },
    }) as Promise<User | null>);
    return data;
  }

  async findAll(): Promise<User[]> {
    const data = (await this.prisma.user.findMany()) as unknown as User[];
    return data;
  }

  async update(id: string, data: UpdateUserInput): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        role: data.role as unknown as UserRole,
      },
    });

    return updatedUser as unknown as User;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
