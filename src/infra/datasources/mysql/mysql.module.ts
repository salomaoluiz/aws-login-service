import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@infra/config/config.service';
import { User } from '@infra/datasources/entities/user/user';
import { ConfigModule } from '@infra/config/config.module';
import { MysqlUserModule } from './mysql-user/mysql-user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.MYSQL_HOST,
        port: configService.MYSQL_PORT,
        password: configService.MYSQL_PASSWORD,
        username: configService.MYSQL_USER,
        database: configService.MYSQL_DATABASE,
        synchronize: true,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: [],
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    MysqlUserModule,
  ],
  exports: [MysqlUserModule],
})
export class MysqlModule {}
