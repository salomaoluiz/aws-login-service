import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import {
  ConfigModule as ConfigModuleNest,
  ConfigService as NestConfigService,
} from '@nestjs/config';

@Module({
  providers: [ConfigService, NestConfigService],
  imports: [ConfigModuleNest.forRoot()],
  exports: [ConfigService],
})
export class ConfigModule {}
