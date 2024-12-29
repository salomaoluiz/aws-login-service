import { Module } from '@nestjs/common';
import { UserDatasource } from './user-datasource';
import { MysqlModule } from '@infra/datasources/mysql/mysql.module';

@Module({
  imports: [MysqlModule],
  providers: [
    {
      provide: 'IUserDatasource',
      useClass: UserDatasource,
    },
  ],
  exports: ['IUserDatasource'],
})
export class UserDatasourceModule {}
