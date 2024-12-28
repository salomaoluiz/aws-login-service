import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import SwaggerSetup from '@infra/swagger/setup';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerSetup.setup(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().then();
