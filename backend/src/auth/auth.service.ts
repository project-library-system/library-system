import { UserPrismaRepository } from '../users/infra/database/UserPrismaRepository';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ConflictException,
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

@Injectable()
export class AuthService {
  constructor(
    private userPrismaRepository: UserPrismaRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userPrismaRepository.findByEmail(data.email);
    if (user?.password_hash !== data.password_hash) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email, role: user.role };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload
      // is the key that was passsed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
      expiresIn: '15min',
    };
  }

  async signUp(data: SignUpRequestDto): Promise<SignUpResponseDto> {
    const existing = await this.userPrismaRepository.findByEmail(data.email);

    if (existing) {
      throw new ConflictException('Já existe uma conta com este e-mail.');
    }

    if (data.password_hash.length < 8 || data.password_hash.length > 20) {
      throw new BadRequestException(
        'A senha deve ter entre 8 e 20 caracteres.',
      );
    }

    const password_hash = await bcrypt.hash(data.password_hash, 10);

    const newUser = User.create({
      name: data.name,
      email: data.email,
      password_hash,
      role: data.role,
    });

    const createdUser = await this.userPrismaRepository.create(newUser);

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };
  }
}
