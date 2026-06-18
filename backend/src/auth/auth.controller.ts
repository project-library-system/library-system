import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignUpRequestDto, SignInRequestDto } from './auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInRequestDto, @Res({ passthrough: true }) response: Response) {
    
    const result = await this.authService.signIn(signInDto);

    response.cookie('library_token', result.access_token, {
      httpOnly: true,
      secure: false, // false em desenvolvimento local (localhost sem HTTPS)
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, 
    });

    return { 
      role: result.role,
      access_token: result.access_token 
    };


  }

  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpRequestDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('library_token');
    return { message: 'Desconectado com sucesso' };
  }

}
