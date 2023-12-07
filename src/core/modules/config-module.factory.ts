import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig } from '@/config';

export class ConfigModuleFactory {
  static create(): DynamicModule {
    return ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
      envFilePath: '.env',
    });
  }
}
