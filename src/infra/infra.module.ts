import { Module } from '@nestjs/common';
import { ConfigModule } from '@infra/config/config.module';
import { SMSSenderModule } from '@infra/sms-sender/sms-sender.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { DatasourceModule } from '@infra/datasources/datasources.module';

@Module({
  imports: [ConfigModule, SMSSenderModule, LoggerModule, DatasourceModule],
  exports: [ConfigModule, SMSSenderModule, LoggerModule, DatasourceModule],
})
export class InfraModule {}
