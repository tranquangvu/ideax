import { UnauthorizedException as NestUnauthorizedException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class UnauthorizedException extends NestUnauthorizedException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Not authenticated');
  }
}
