import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

class SwaggerSetup {
  static setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('This is the documentation of ')
      .setVersion('1.0')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory, {
      jsonDocumentUrl: 'swagger/json',
    });
  }
}

export default SwaggerSetup;
