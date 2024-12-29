import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthPipe } from '@presentation/auth/auth.pipe';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body(new AuthPipe()) loginWithPhoneDto: LoginDto) {
    return this.authService.login(loginWithPhoneDto);
  }
}
