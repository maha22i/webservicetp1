import { ApiException } from '@webservicetp1/api/core/error';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Error, model, Model } from 'mongoose';
import { Observable } from 'rxjs';
import { EditionHouseDto } from './edition-house.dto';
import {
  EditionHouseDocument,
  EditionHouseEntity,
  EditionHouseEntityWithId,
  EditionHouseSchema,
} from './edition-house.entity';
import { EditionHouseMapper } from './edition-house.mapper';
import { EditionHouseService } from './edition-house.service';
import * as mockingoose from 'mockingoose';

describe('EditionHouseService', () => {
  let service: EditionHouseService;
  let mapperMock: Partial<EditionHouseMapper>;
  let modelMock: Partial<Model<EditionHouseDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EditionHouseService],
    })
      .useMocker((token) => {
        if (token === EditionHouseMapper) {
          const dtos = [{ id: '' }, { id: '' }];
          mapperMock = {
            mapEntitiesToDtos: jest
              .fn<EditionHouseDto[], [EditionHouseEntityWithId[]]>()
              .mockReturnValue(dtos),
            mapEntityToDto: jest
              .fn<EditionHouseDto, [EditionHouseEntityWithId]>()
              .mockReturnValue(dtos[0]),
          };
          return mapperMock;
        }
        if (token === getModelToken(EditionHouseEntity.name)) {
          modelMock = model<EditionHouseDocument>(
            EditionHouseEntity.name,
            EditionHouseSchema
          );
          const entities: EditionHouseEntityWithId[] = [{ id: '' }, { id: '' }];
          mockingoose(modelMock)
            .toReturn(entities, modelMock.find.name)
            .toReturn(10, modelMock.count.name)
            .toReturn(entities[0], modelMock.findOne.name);
          return modelMock;
        }
      })
      .compile();

    service = module.get<EditionHouseService>(EditionHouseService);
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

    it('should stream PaginatedItems items', (done) => {
      const skip = 0;
      const limit = 10;

      const result = service.findAll(skip, limit);

      result.subscribe((data) => {
        expect(data).toBeTruthy();
        expect(typeof data).toBe('object');
        expect(data.items).toBeInstanceOf(Array);
        expect(Number.isInteger(data.count)).toBeTruthy();
        done();
      });
    });

    it('should call mapper.mapEntitiesToDtos one time', (done) => {
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

    it('should stream object items', (done) => {
      const id = '6214b2f566b3922d448c42c0';

      const result = service.findOne(id);

      result.subscribe((data) => {
        expect(typeof data).toBe('object');
        done();
      });
    });

    it('should call mapper.mapEntityToDto one time', (done) => {
      const id = '6214b2f566b3922d448c42c0';

      const result = service.findOne(id);

      result.subscribe(() => {
        expect(mapperMock.mapEntityToDto).toBeCalledTimes(1);
        done();
      });
    });

    it('should throw an ApiResourceException', (done) => {
      const id = '6214b2f566b3922d448c42c0';
      mockingoose(modelMock).toReturn(
        new Error.DocumentNotFoundError(''),
        modelMock.findOne.name
      );

      const result = service.findOne(id);

      result.subscribe(null, (error) => {
        expect(error).toBeInstanceOf(ApiException);
        done();
      });
    });

    it('should throw another error', (done) => {
      const id = '6214b2f566b3922d448c42c0';
      mockingoose(modelMock).toReturn(
        new Error.CastError('', null, ''),
        modelMock.findOne.name
      );

      const result = service.findOne(id);

      result.subscribe(null, (error) => {
        expect(error).not.toBeInstanceOf(ApiException);
        done();
      });
    });
  });
});
