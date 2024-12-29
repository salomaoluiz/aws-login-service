import { Module } from '@nestjs/common';
import { ConfigModule } from '@infra/config/config.module';
import { SMSSenderModule } from '@infra/sms-sender/sms-sender.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { DatasourceModule } from '@infra/datasources/datasources.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule,
    SMSSenderModule,
    LoggerModule,
    DatasourceModule,
    JwtModule,
  ],
  exports: [
    ConfigModule,
    SMSSenderModule,
    LoggerModule,
    DatasourceModule,
    JwtModule,
  ],
})
export class InfraModule {}
