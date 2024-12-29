import { Module } from '@nestjs/common';
import { AuthGuard } from '@interceptors/auth/auth.guard';
import { JwtModule } from '@infra/jwt/jwt.module';

@Module({
  imports: [JwtModule],
  providers: [AuthGuard],
})
export class InterceptorsModule {}
