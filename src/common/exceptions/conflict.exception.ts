import { ConflictException as NestConflictException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class ConflictException extends NestConflictException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Conflict');
  }
}
