import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from './app.module';
import { CustomReturnFieldsInterceptor } from './middlewares/custom-return-fields.interceptor';
import { HttpExceptionFilter } from './middlewares/https-exception.filter';

const logger = new Logger('Main');

const NODE_ENV = process.env.NODE_ENV;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const API_PORT = configService.get<string>('API_PORT') || 4000;
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new CustomReturnFieldsInterceptor());
  if (NODE_ENV === 'development') {
    createSwagger(app);
  }

  await app.listen(API_PORT);
  logger.log(`Application running on port ${API_PORT}`);
}

function createSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('vMessage')
    .setDescription('Chat application')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .addServer('/', 'Server')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

bootstrap();
