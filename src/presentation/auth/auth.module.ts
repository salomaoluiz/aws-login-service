import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ApplicationModule } from '@application/application.module';
import { AuthService } from '@presentation/auth/auth.service';
import { InfraModule } from '@infra/infra.module';

@Module({
  imports: [ApplicationModule, InfraModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class PresentationAuthModule {}
