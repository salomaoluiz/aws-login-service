import { Module } from '@nestjs/common';
import { NestJwt } from './nest-jwt/nest-jwt';
import { JwtModule as NestJwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@infra/config/config.module';

@Module({
  imports: [NestJwtModule, ConfigModule],
  providers: [
    {
      provide: 'IJwt',
      useClass: NestJwt,
    },
    JwtService,
  ],
  exports: ['IJwt'],
})
export class JwtModule {}
