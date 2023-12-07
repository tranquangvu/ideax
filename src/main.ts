import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { AppModule } from './app.module';
import { MongooseValidationFilter } from './core/filters';
import { MongooseClassSerializerInterceptor } from './core/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });
  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');

  app.use(helmet());
  app.enableVersioning();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(
    new LoggerErrorInterceptor(),
    new MongooseClassSerializerInterceptor(reflector, {
      excludePrefixes: ['_', '__'],
    }),
  );
  app.useGlobalFilters(new MongooseValidationFilter());
  app.useLogger(app.get(Logger));

  const documentConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API Documents')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
