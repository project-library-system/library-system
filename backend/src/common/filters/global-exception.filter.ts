import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoanDomainException } from 'src/loan/domain/exceptions/LoanExceptions';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';
    let errorType = 'InternalError';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || exceptionResponse;
      errorType = 'HttpException';
    } else if (exception instanceof LoanDomainException) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      errorType = exception.name;
    } else if (exception instanceof Error) {
      // Outros erros genéricos
      if (exception.message === 'Exemplar não encontrado!') {
        status = HttpStatus.NOT_FOUND;
      } else {
        status = HttpStatus.BAD_REQUEST;
      }
      message = exception.message;
      errorType = exception.name;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorType,
      message: message,
    });
  }
}
