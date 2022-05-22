import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { model, Model } from 'mongoose';
import { MatchDocument, MatchEntity, MatchSchema } from './Match.entity';
import { MatchMapper } from './Match.mapper';
import { MatchService } from './Match.service';
import * as mockingoose from 'mockingoose';

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchService],
    })
      .useMocker((token) => {
        if (token === MatchMapper) {
          const mapperMock: Partial<MatchMapper> = {};
          return mapperMock;
        }
        if (token === getModelToken(MatchEntity.name)) {
          const modelMock: Model<MatchDocument> = model<MatchDocument>(
            MatchEntity.name,
            MatchSchema
          );
          mockingoose(modelMock);
          return modelMock;
        }
      })
      .compile();

    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
