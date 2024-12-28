import { Module } from '@nestjs/common';
import { MysqlUserService } from '@infra/datasources/mysql/mysql-user/mysql-user.service';
import { LoggerService } from '@infra/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@infra/datasources/entities/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [LoggerService, MysqlUserService],
  exports: [MysqlUserService],
})
export class MysqlUserModule {}
