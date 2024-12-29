import { Module } from '@nestjs/common';
import { DataModule } from '@data/data.module';
import { LoginWithPhoneUseCase } from './login-with-phone-use-case';
import { ConfirmUserPhoneUseCase } from './confirm-user-phone-use-case';
import { JwtModule } from '@infra/jwt/jwt.module';
import { UpdateUserUseCase } from './update-user-use-case';
import { GetUserUseCase } from './get-user-use-case';

@Module({
  imports: [JwtModule, DataModule],
  providers: [
    LoginWithPhoneUseCase,
    ConfirmUserPhoneUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
  ],
  exports: [
    LoginWithPhoneUseCase,
    ConfirmUserPhoneUseCase,
    UpdateUserUseCase,
    GetUserUseCase,
  ],
})
export class ApplicationAuthModule {}
