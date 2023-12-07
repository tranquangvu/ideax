import { NotFoundException as NestNotFoundException } from '@nestjs/common';
import { HttpExceptionMessage } from '../types';

export class NotFoundException extends NestNotFoundException {
  constructor(message?: HttpExceptionMessage) {
    super(message ?? 'Not found');
  }
}
