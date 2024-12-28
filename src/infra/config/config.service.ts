import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: NestConfigService) {}

  get MYSQL_HOST(): string {
    return this.configService.get<string>('MYSQL_HOST');
  }

  get MYSQL_PORT(): number {
    return this.configService.get<number>('MYSQL_PORT');
  }

  get MYSQL_PASSWORD(): string {
    return this.configService.get<string>('MYSQL_PASSWORD');
  }

  get MYSQL_USER(): string {
    return this.configService.get<string>('MYSQL_USER');
  }

  get MYSQL_DATABASE(): string {
    return this.configService.get<string>('MYSQL_DATABASE');
  }
}
