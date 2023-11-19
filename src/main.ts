import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { configureMiddlewares } from 'middlewares/middleware.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());

  configureMiddlewares(app);
  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
