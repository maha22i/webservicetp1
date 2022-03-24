import { ApiErrorCode } from '@webservicetp1/common/resource/error';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { EquipeModule } from './equipe.module';
import { EquipeDocument, EquipeEntity } from './equipe.entity';

describe('EquipeResource', () => {
  let app: INestApplication;
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), EquipeModule],
    }).compile();

    const model = moduleRef.get<Model<EquipeDocument>>(
      getModelToken(EquipeEntity.name)
    );
    const entities = [
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 1' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 2' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 3' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 4' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 5' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 6' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 7' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 8' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 9' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 10' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 11' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 12' },
      { NomEquipeDomicile: '', NomEquipeExterieur: '', NomEquipe: 'PSG 13' },
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

  describe('GET /equipe', () => {
    it('should respond with data', (done) => {
      request(app.getHttpServer())
        .get('/equipe')
        .then((response) => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(
            Number.isInteger(Number(response.headers['x-total-count']))
          ).toBeTruthy();
          expect(Array.isArray(response.body)).toBeTruthy();
        })
        .finally(done);
    });
    it('should respond with a page of data', (done) => {
      request(app.getHttpServer())
        .get('/equipe?page=1&size=5')
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(HttpStatus.OK);
          expect(Number(response.headers['x-total-count'])).toBe(13);
          expect(response.body.length).toBe(5);
          expect(response.body[0].NomEquipe).toBe('PSG 6');
        })
        .finally(done);
    });
    it('should respond bad request with bad page', (done) => {
      request(app.getHttpServer())
        .get('/equipe?page=x&size=5')
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
          expect(response.headers['x-total-count']).toBeUndefined();
          expect(response.body.code).toBe(ApiErrorCode.ParamsStructureInvalid);
        })
        .finally(done);
    });
  });
});
