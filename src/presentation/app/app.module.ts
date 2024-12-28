import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { DatasourceModule } from '@infra/datasources/datasources.module';

@Module({
  imports: [DatasourceModule],
  controllers: [AppController],
})
export class AppModule {}
