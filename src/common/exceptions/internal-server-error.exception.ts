import { InternalServerErrorException as NestInternalServerErrorException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class ConflictException extends NestInternalServerErrorException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Internal server error');
  }
}
