import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthPipe } from '@presentation/auth/auth.pipe';
import { Response } from 'express';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body(new AuthPipe()) loginWithPhoneDto: LoginDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.login(loginWithPhoneDto);

    return res.status(result.status).json(result.body).send();
  }
}
