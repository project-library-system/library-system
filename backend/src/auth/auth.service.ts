import { UserPrismaRepository } from '../users/infra/database/UserPrismaRepository';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/domain/entities/User';
import {
  SignInRequestDto,
  SignInResponseDto,
  SignUpRequestDto,
  SignUpResponseDto,
} from './auth.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserRepository')
    private userPrismaRepository: UserPrismaRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userPrismaRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password_hash);
    if (!passwordMatches) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    const payload = { sub: user.id, username: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      expiresIn: '15min',
      role: user.role as UserRole,
    };
  }

  async signUp(data: SignUpRequestDto): Promise<SignUpResponseDto> {
    const existing = await this.userPrismaRepository.findByEmail(data.email);

    if (existing) {
      throw new ConflictException('Já existe uma conta com este e-mail.');
    }

    const password_hash = await bcrypt.hash(data.password, 10);
    const role = data.role ?? UserRole.USER;

    const newUser = User.create({
      name: data.name,
      email: data.email,
      password_hash,
      role,
    });

    const createdUser = await this.userPrismaRepository.create(newUser);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role as unknown as UserRole,
    };
  }
}
