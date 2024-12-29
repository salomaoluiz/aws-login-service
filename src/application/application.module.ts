import { Module } from '@nestjs/common';
import { ApplicationAuthModule } from './auth/auth.module';

@Module({
  imports: [ApplicationAuthModule],
  exports: [ApplicationAuthModule],
})
export class ApplicationModule {}
