import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';

export const appConfig = registerAs<AppConfig>('app', () => {
  const nodeEnv = process.env.NODE_ENV ?? 'development';

  return {
    env: {
      name: nodeEnv,
      isDevelopment: nodeEnv === 'development',
      isProduction: nodeEnv === 'production',
      isTest: nodeEnv === 'test',
    },
    port: +process.env.PORT ?? 3000,
  };
});
