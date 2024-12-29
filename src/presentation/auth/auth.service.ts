import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { LoginWithPhoneUseCase } from '@application/auth/login-with-phone-use-case';

@Injectable()
export class AuthService {
  constructor(private readonly loginWithPhoneUseCase: LoginWithPhoneUseCase) {}

  async login(loginWithPhoneDto: LoginDto) {
    try {
      const entity =
        await this.loginWithPhoneUseCase.execute(loginWithPhoneDto);

      return {
        status: HttpStatus.OK,
        body: entity,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === HttpStatus.ACCEPTED) {
          return {
            status: HttpStatus.ACCEPTED,
            body: null,
          };
        }
      }

      throw error;
    }
  }
}
