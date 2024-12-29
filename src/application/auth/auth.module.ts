import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataModule } from '@data/data.module';
import { LoginWithPhoneUseCase } from './login-with-phone-use-case';
import { ConfirmUserPhoneUseCase } from './confirm-user-phone-use-case';

@Module({
  imports: [JwtModule, DataModule],
  providers: [LoginWithPhoneUseCase, ConfirmUserPhoneUseCase],
  exports: [LoginWithPhoneUseCase, ConfirmUserPhoneUseCase],
})
export class ApplicationAuthModule {}
