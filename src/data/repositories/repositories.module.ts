import { Module } from '@nestjs/common';
import { DataAuthModule } from './auth/auth.module';

@Module({
  imports: [DataAuthModule],
  exports: [DataAuthModule],
})
export class RepositoriesModule {}
