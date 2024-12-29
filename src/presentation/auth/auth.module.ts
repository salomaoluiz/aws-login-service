import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApplicationModule } from '@application/application.module';
import { AuthService } from '@presentation/auth/auth.service';

@Module({
  imports: [ApplicationModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class PresentationAuthModule {}
