import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthPipe } from './auth.pipe';
import { ConfirmDto } from './dto/confirm.dto';

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

  @Post('/confirm')
  async confirm(@Body() confirmDto: ConfirmDto, @Res() res: Response) {
    const result = await this.authService.confirm(confirmDto);

    return res.status(result.status).json(result.body).send();
  }
}
