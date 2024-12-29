import { Module } from '@nestjs/common';
import { MysqlUser } from '@infra/datasources/mysql/mysql-user/mysql-user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@infra/datasources/entities/user/user';
import { Logger } from '@infra/logger/logger';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [Logger, MysqlUser],
  exports: [MysqlUser],
})
export class MysqlUserModule {}
