import { ApiErrorCode } from '@webservicetp1/common/resource/error';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Model } from 'mongoose';
import * as request from 'supertest';
import {
  EditionHouseDocument,
  EditionHouseEntity,
} from './edition-house.entity';
import { EditionHouseModule } from './edition-house.module';

describe('EditionHouseResource', () => {
  let app: INestApplication;
  let mongoMemoryServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    const moduleRef = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(uri), EditionHouseModule],
    }).compile();

    const model = moduleRef.get<Model<EditionHouseDocument>>(
      getModelToken(EditionHouseEntity.name)
    );
    const entities = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    for (const entity of entities) {
      await model.create(entity);
    }

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /edition-houses', () => {
    it('should respond with data', (done) => {
      request(app.getHttpServer())
        .get('/edition-houses')
        .then((response) => {
          expect(response.status).toBe(HttpStatus.OK);
          expect(
            Number.isInteger(Number(response.headers['x-total-count']))
          ).toBeTruthy();
          expect(Array.isArray(response.body)).toBeTruthy();
          done();
        });
    });
    it('should respond with a page of data', (done) => {
      request(app.getHttpServer())
        .get('/edition-houses?page=1&size=5')
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(HttpStatus.OK);
          expect(Number(response.headers['x-total-count'])).toBe(13);
          expect(response.body.length).toBe(5);
          done();
        });
    });
    it('should respond bad request with bad page', (done) => {
      request(app.getHttpServer())
        .get('/edition-houses?page=x&size=5')
        .then((response) => {
          expect(response).toBeDefined();
          expect(response.status).toBe(HttpStatus.BAD_REQUEST);
          expect(response.headers['x-total-count']).toBeUndefined();
          expect(response.body.code).toBe(ApiErrorCode.ParamsStructureInvalid);
          done();
        });
    });
  });
});
