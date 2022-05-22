import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import {
  EquipeDocument,
  EquipeEntity,
} from '@webservicetp1/api/service/equipe';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import { join } from 'path';
import * as request from 'supertest';
import { EquipeModule } from './equipe.module';
describe('EquipeResource', () => {
  let app: INestApplication;
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), 'dist/schema.gql'),
        }),
        EquipeModule,
      ],
    }).compile();

    const model = moduleRef.get<Model<EquipeDocument>>(
      getModelToken(EquipeEntity.name)
    );
    const entities = [
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
      { NomEquipe: '', NomEquipeDomicile: '', NomEquipeExterieur: 'psg' },
    ];
    for (const entity of entities) {
      await model.create(entity);
    }

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('query', () => {
    describe('equipe', () => {
      it('should respond with data', (done) => {
        const page = 1;
        const size = 10;
        const query = `{
  equipe(page: ${page}, size: ${size}) {
    count,
    items {id, title, authors{lastName}}
  }
}`;

        request(app.getHttpServer())
          .post('/graphql')
          .send({ query })
          .then((response) => {
            expect(response.status).toBe(HttpStatus.OK);
            done();
          });
      });
    });
  });
});
