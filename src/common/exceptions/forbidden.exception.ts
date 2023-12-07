import { ForbiddenException as NestForbiddenException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class ForbiddenException extends NestForbiddenException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Forbidden');
  }
}
