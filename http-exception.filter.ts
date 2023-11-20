import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import * as fs from 'fs';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.getResponse();

    const logMessage = `${new Date().toISOString()} - Ruta: ${
      request.url
    } - Status Code: ${status} - Error: ${JSON.stringify(errorResponse)}\n`;
    const logFilePath = process.env.ERROR_LOG_FILE_PATH || 'error-log.txt';
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error(
          'Error al escribir en el archivo de registro de errores:',
          err,
        );
      }
    });
    response.status(status).json({
      statusCode: status,
      error: errorResponse,
    });
  }
}
