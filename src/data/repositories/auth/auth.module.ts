import { Module } from '@nestjs/common';
import { LoginRepository } from './login/login-repository';
import { UserDatasourceModule } from '@data/datasources/mysql/user/user-datasource.module';
import { LoginDatasourceModule } from '@data/datasources/mysql/login/login-datasource.module';
import { UserRepository } from '@data/repositories/auth/user/user-repository';

@Module({
  imports: [UserDatasourceModule, LoginDatasourceModule],
  providers: [
    { provide: 'ILoginRepository', useClass: LoginRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: ['ILoginRepository', 'IUserRepository'],
})
export class AuthModule {}
