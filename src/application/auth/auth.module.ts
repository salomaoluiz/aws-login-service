import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DataModule } from '@data/data.module';
import { LoginWithPhoneUseCase } from './login-with-phone-use-case';

@Module({
  imports: [JwtModule, DataModule],
  providers: [LoginWithPhoneUseCase],
  exports: [LoginWithPhoneUseCase],
})
export class ApplicationAuthModule {}
