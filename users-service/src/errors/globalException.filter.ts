import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './appError.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      message = (exception.getResponse() as any).message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof AppError) {
      status = exception.statusCode;
      message = exception.message;
    } else {
      console.log(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
