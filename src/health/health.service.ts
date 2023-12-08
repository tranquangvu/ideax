import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  status() {
    return { status: 'up me' };
  }
}
