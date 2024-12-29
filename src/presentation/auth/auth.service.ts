import { Injectable } from '@nestjs/common';
import { LoginWithPhoneDto } from './dto/login-with-phone.dto';
import { LoginWithPhoneUseCase } from '@application/auth/login-with-phone-use-case';

@Injectable()
export class AuthService {
  constructor(private readonly loginWithPhoneUseCase: LoginWithPhoneUseCase) {}

  loginWithPhoneDto(loginWithPhoneDto: LoginWithPhoneDto) {
    return this.loginWithPhoneUseCase.execute(loginWithPhoneDto);
  }
}
