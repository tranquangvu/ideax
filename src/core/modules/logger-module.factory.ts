import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

export class LoggerModuleFactory {
  static create(): DynamicModule {
    return LoggerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          level: configService.get<boolean>('app.env.isProduction')
            ? 'info'
            : 'debug',
          customProps: () => ({
            context: 'HTTP',
          }),
          transport: {
            target: 'pino-pretty',
            options: {
              singleLine: true,
              ignore:
                'pid,hostname,req.id,req.remoteAddress,req.remotePort,req.headers,res.headers',
            },
          },
        },
      }),
      inject: [ConfigService],
    });
  }
}
