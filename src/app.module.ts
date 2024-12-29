import { Module } from '@nestjs/common';
import { DatasourceModule } from '@infra/datasources/datasources.module';
import { DataModule } from '@data/data.module';
import { ApplicationModule } from '@application/application.module';
import { PresentationModule } from '@presentation/presentation.module';
import { InfraModule } from '@infra/infra.module';
import { InterceptorsModule } from '@interceptors/interceptors.module';

@Module({
  imports: [
    DatasourceModule,
    DataModule,
    ApplicationModule,
    PresentationModule,
    InfraModule,
    InterceptorsModule,
  ],
})
export class AppModule {}
