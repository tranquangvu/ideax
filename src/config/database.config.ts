import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';

export const databaseConfig = registerAs<DatabaseConfig>('database', () => ({
  mongodbUri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ideax',
}));
