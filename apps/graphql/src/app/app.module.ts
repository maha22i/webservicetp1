import { mongoDbUri } from '@webservicetp1/api/repository/uri';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { environment } from '../environments/environment';
import { EquipeModule } from './equipe/equipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment.envFilePath
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongoDbUri,
      inject: [ConfigService]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'dist/apps/graphql/schema.gql'),
    }),
    EquipeModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
