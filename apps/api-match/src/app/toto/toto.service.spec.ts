import { ApiException } from '@webservicetp1/api/core/error';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Error, model, Model } from 'mongoose';
import { Observable } from 'rxjs';
import { TotoDto } from './toto.dto';
import { TotoDocument, TotoEntity, TotoEntityWithId, TotoSchema } from './toto.entity';
import { TotoMapper } from './toto.mapper';
import { TotoService } from './toto.service';
import * as mockingoose from 'mockingoose';

describe('TotoService', () => {
  let service: TotoService;
  let mapperMock: Partial<TotoMapper>;
  let modelMock: Partial<Model<TotoDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotoService],
    })
      .useMocker(token => {
        if (token === TotoMapper) {
          const dtos = [
            { id: '' },
            { id: '' },
          ];
          mapperMock = {
            mapEntitiesToDtos: jest.fn<TotoDto[], [TotoEntityWithId[]]>().mockReturnValue(dtos),
            mapEntityToDto: jest.fn<TotoDto, [TotoEntityWithId]>().mockReturnValue(dtos[0])
          }
          return mapperMock;
        }
        if (token === getModelToken(TotoEntity.name)) {
          modelMock = model<TotoDocument>(TotoEntity.name, TotoSchema);
          const entities: TotoEntityWithId[] = [
            { id: '' },
            { id: '' }
          ];
          mockingoose(modelMock)
            .toReturn(entities, modelMock.find.name)
            .toReturn(10, modelMock.count.name)
            .toReturn(entities[0], modelMock.findOne.name);
          return modelMock;
        }
      })
      .compile();

    service = module.get<TotoService>(TotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an Observable', () => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      expect(result).toBeInstanceOf(Observable);
    });

    it('should stream PaginatedItems items', done => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      result.subscribe(data => {
        expect(data).toBeTruthy();
        expect(typeof data).toBe('object');
        expect(data.items).toBeInstanceOf(Array);
        expect(Number.isInteger(data.count)).toBeTruthy();
        done();
      });
    });

    it('should call mapper.mapEntitiesToDtos one time', done => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      result.subscribe(() => {
        expect(mapperMock.mapEntitiesToDtos).toBeCalledTimes(1);
        done();
      });
    });
  });

  describe('findOne', () => {
    it('should return an Observable', () => {
      const id = '6214b2f566b3922d448c42c0';

      const result = service.findOne(id);

      expect(result).toBeInstanceOf(Observable);
    });

    it('should stream object items', done => {
      const id = '6214b2f566b3922d448c42c0';

      const result = service.findOne(id);

      result.subscribe(data => {
        expect(typeof data).toBe('object');
        done();
      });
    });

    it('should call mapper.mapEntityToDto one time', done => {
      const id = '6214b2f566b3922d448c42c0';

      const result = service.findOne(id);

      result.subscribe(() => {
        expect(mapperMock.mapEntityToDto).toBeCalledTimes(1);
        done();
      });
    });

    it('should throw an ApiResourceException', done => {
      const id = '6214b2f566b3922d448c42c0';
      mockingoose(modelMock)
        .toReturn(new Error.DocumentNotFoundError(''), modelMock.findOne.name);

      const result = service.findOne(id);

      result.subscribe(null, error => {
        expect(error).toBeInstanceOf(ApiException);
        done();
      });
    });

    it('should throw another error', done => {
      const id = '6214b2f566b3922d448c42c0';
      mockingoose(modelMock)
        .toReturn(new Error.CastError('', null, ''), modelMock.findOne.name);

      const result = service.findOne(id);

      result.subscribe(null, error => {
        expect(error).not.toBeInstanceOf(ApiException);
        done();
      });
    });
  });
});
