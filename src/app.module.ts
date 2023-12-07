import { Module } from '@nestjs/common';
import {
  ConfigModuleFactory,
  DatabaseModuleFactory,
  LoggerModuleFactory,
} from '@/core/modules';
import { HealthModule } from './health/health.module';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [
    ConfigModuleFactory.create(),
    DatabaseModuleFactory.create(),
    LoggerModuleFactory.create(),
    HealthModule,
    IdeaModule,
  ],
})
export class AppModule {}
