import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { configureMiddlewares } from 'middlewares/middleware.config';
import { HttpExceptionFilter } from 'http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.LOG_ERRORS === 'true') {
    app.useGlobalFilters(new HttpExceptionFilter());
    console.log('here');
  }
  configureMiddlewares(app);
  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
