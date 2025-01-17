import { Module } from '@nestjs/common';
import { PresentationAuthModule } from '@presentation/auth/auth.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [PresentationAuthModule, HealthModule],
})
export class PresentationModule {}
