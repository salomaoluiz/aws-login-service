import { Module } from '@nestjs/common';
import { DatasourceModule } from '@infra/datasources/datasources.module';
import { DataModule } from '@data/data.module';
import { ApplicationModule } from '@application/application.module';
import { PresentationModule } from '@presentation/presentation.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [
    DatasourceModule,
    DataModule,
    ApplicationModule,
    PresentationModule,
    InfraModule,
  ],
})
export class AppModule {}
