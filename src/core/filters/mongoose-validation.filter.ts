import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Error } from 'mongoose';

@Catch(Error.ValidationError)
export class MongooseValidationFilter implements ExceptionFilter {
  catch(exception: Error.ValidationError, host: ArgumentsHost): any {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = HttpStatus.UNPROCESSABLE_ENTITY;

    return response.status(status).json({
      error: 'Unprocessable Entity',
      message: exception.message,
      statusCode: status,
    });
  }
}
