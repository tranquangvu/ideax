import { randomBytes } from 'crypto';

export function generateRandomToken(length: number = 32) {
  return randomBytes(length).toString('hex');
}
