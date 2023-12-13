import { Catch, HttpStatus, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AppError } from './appError.exception';
import { status } from '@grpc/grpc-js';

@Catch()
export class GlobalGrpcExceptionFilter implements RpcExceptionFilter {
  static HttpStatusCode: Record<number, number> = {
    [HttpStatus.BAD_REQUEST]: status.INVALID_ARGUMENT,
    [HttpStatus.UNAUTHORIZED]: status.UNAUTHENTICATED,
    [HttpStatus.FORBIDDEN]: status.PERMISSION_DENIED,
    [HttpStatus.NOT_FOUND]: status.NOT_FOUND,
    [HttpStatus.INTERNAL_SERVER_ERROR]: status.INTERNAL,
  };

  catch(exception: any): Observable<any> {
    const code =
      exception instanceof AppError
        ? exception.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return throwError(() => ({
      code: GlobalGrpcExceptionFilter.HttpStatusCode[code] ?? status.UNKNOWN,
      message: exception.message || 'Internal Server Error',
    }));
  }
}
