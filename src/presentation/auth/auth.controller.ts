import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginWithPhoneDto } from './dto/login-with-phone.dto';
import { AuthPipe } from '@presentation/auth/auth.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login-with-phone')
  create(@Body(new AuthPipe()) loginWithPhoneDto: LoginWithPhoneDto) {
    return this.authService.loginWithPhoneDto(loginWithPhoneDto);
  }
}
