import { BadRequestException as NestBadRequestException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class BadRequestException extends NestBadRequestException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Bad request');
  }
}
