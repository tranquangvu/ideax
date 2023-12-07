import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

export class DatabaseModuleFactory {
  static create(): DynamicModule {
    return MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.mongodbUri'),
      }),
      inject: [ConfigService],
    });
  }
}
