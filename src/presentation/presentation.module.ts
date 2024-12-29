import { Module } from '@nestjs/common';
import { PresentationAuthModule } from '@presentation/auth/auth.module';

@Module({
  imports: [PresentationAuthModule],
})
export class PresentationModule {}
