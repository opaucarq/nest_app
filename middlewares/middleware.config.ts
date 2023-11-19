import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from 'http-exception.filter';

export function configureMiddlewares(app: INestApplication) {
  const logFilePath = process.env.LOG_FILE_PATH || 'response-time-log.txt';
  if (process.env.LOG_TIMERESPONSES === 'true') {
    app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const end = Date.now();
        const elapsedTime = end - start;
        const logMessage = `${new Date().toISOString()} - Ruta: ${
          req.url
        } - Response Time: ${elapsedTime} ms\n`;
        fs.appendFile(logFilePath, logMessage, (err) => {
          if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
          }
        });
      });
      next();
    });
  }

  if (process.env.LOG_ERRORS === 'true') {
    app.useGlobalFilters(new HttpExceptionFilter());
  }
}
