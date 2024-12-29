import { Module } from '@nestjs/common';
import { DatasourceModule } from '@infra/datasources/datasources.module';
import { DataModule } from '@data/data.module';
import { ApplicationModule } from '@application/application.module';
import { PresentationModule } from '@presentation/presentation.module';

@Module({
  imports: [
    DatasourceModule,
    DataModule,
    ApplicationModule,
    PresentationModule,
  ],
})
export class AppModule {}
