import { Module } from '@nestjs/common';
import { LoginDatasource } from '@data/datasources/mysql/login/login-datasource';
import { UserDatasource } from '@data/datasources/mysql/user/user-datasource';
import { MysqlModule } from '@infra/datasources/mysql/mysql.module';

@Module({
  imports: [MysqlModule],
  providers: [
    { provide: 'ILoginDatasource', useClass: LoginDatasource },
    { provide: 'IUserDatasource', useClass: UserDatasource },
  ],
  exports: ['ILoginDatasource', 'IUserDatasource'],
})
export class DataMysqlModule {}
