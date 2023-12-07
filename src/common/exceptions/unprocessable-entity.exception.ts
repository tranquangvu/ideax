import { UnprocessableEntityException as NestUnprocessableEntityException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class UnprocessableEntityException extends NestUnprocessableEntityException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Unprocessable entity');
  }
}
