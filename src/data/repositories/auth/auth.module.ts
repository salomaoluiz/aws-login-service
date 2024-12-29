import { Module } from '@nestjs/common';
import { LoginRepository } from './login/login-repository';
import { UserRepository } from '@data/repositories/auth/user/user-repository';
import { DataMysqlModule } from '@data/datasources/mysql/mysql.module';

@Module({
  imports: [DataMysqlModule],
  providers: [
    { provide: 'ILoginRepository', useClass: LoginRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: ['ILoginRepository', 'IUserRepository'],
})
export class DataAuthModule {}
