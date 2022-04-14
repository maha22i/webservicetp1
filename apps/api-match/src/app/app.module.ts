import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApiExceptionFilter,
  ErrorFilter,
  NotFoundExceptionFilter,
} from './api-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EquipeModule } from './equipe/equipe.module';
import { MatchModule } from './match/match.module';
import { winstonConfig } from './common/logging.config';
import { WinstonModule } from 'nest-winston';
import { environment } from '../environments/environment.prod';
import { mongoDbUri } from './database.util';
import { ClientCacheInterceptor } from './client-cache.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment.envFilePath,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongoDbUri,
      inject: [ConfigService],
    }),
    WinstonModule.forRoot(winstonConfig),
    EquipeModule,
    MatchModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClientCacheInterceptor,
    },
  ],
})
export class AppModule {}
