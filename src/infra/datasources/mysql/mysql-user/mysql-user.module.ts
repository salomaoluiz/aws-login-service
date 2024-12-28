import { Module } from '@nestjs/common';
import { MysqlUserService } from '@infra/datasources/mysql/mysql-user/mysql-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@infra/datasources/entities/user/user';
import { Logger } from '@infra/logger/logger';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [Logger, MysqlUserService],
  exports: [MysqlUserService],
})
export class MysqlUserModule {}
