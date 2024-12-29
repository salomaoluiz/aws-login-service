import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginWithPhoneUseCase } from '@application/auth/login-with-phone-use-case';

@Injectable()
export class AuthService {
  constructor(private readonly loginWithPhoneUseCase: LoginWithPhoneUseCase) {}

  login(loginWithPhoneDto: LoginDto) {
    return this.loginWithPhoneUseCase.execute(loginWithPhoneDto);
  }
}
