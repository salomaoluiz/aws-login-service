import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { LoginWithPhoneUseCase } from '@application/auth/login-with-phone-use-case';
import { ConfirmUserPhoneUseCase } from '@application/auth/confirm-user-phone-use-case';
import { ConfirmDto } from '@presentation/auth/dto/confirm.dto';
import { UpdateDto } from '@presentation/auth/dto/update.dto';
import { UpdateUserUseCase } from '@application/auth/update-user-use-case';
import { GetUserUseCase } from '@application/auth/get-user-use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginWithPhoneUseCase: LoginWithPhoneUseCase,
    private readonly confirmUserPhoneUseCase: ConfirmUserPhoneUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

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
            body: error.message,
          };
        }
      }

      throw error;
    }
  }

  async confirm(confirmDto: ConfirmDto) {
    await this.confirmUserPhoneUseCase.execute(confirmDto);

    return {
      status: HttpStatus.OK,
      body: 'Phone number confirmed',
    };
  }

  async update(userId: number, updateDto: UpdateDto) {
    try {
      await this.updateUserUseCase.execute({
        userId,
        data: updateDto,
      });

      return {
        status: HttpStatus.OK,
        body: 'User updated',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        if (error.getStatus() === HttpStatus.ACCEPTED) {
          return {
            status: HttpStatus.ACCEPTED,
            body: error.message,
          };
        }
      }

      throw error;
    }
  }

  async getUser(userId: number) {
    const result = await this.getUserUseCase.execute(userId);

    return {
      status: HttpStatus.OK,
      body: result,
    };
  }
}
