import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useLogger(new Logger());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const logFilePath = process.env.LOG_FILE_PATH || 'response-time-log.txt';

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const end = Date.now();
      const elapsedTime = end - start;
      console.log(`Tiempo de respuesta: ${elapsedTime} ms`);
      const logMessage = `${new Date().toISOString()} - Ruta: ${req.url} - Tiempo de respuesta: ${elapsedTime} ms\n`;
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error('Error al escribir en el archivo de registro:', err);
        }
      });
    });
    next();
  });

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
