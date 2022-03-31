import { ApiException } from '@webservicetp1/api/core/error';
import { EquipeDto } from '@webservicetp1/common/resource/equipe';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Error, model, Model } from 'mongoose';
import { Observable } from 'rxjs';

import * as mockingoose from 'mockingoose';
import { EquipeMapper } from './equipe.mapper';
import {
  EquipeDocument,
  EquipeEntity,
  EquipeEntityWithId,
  EquipeSchema,
} from './equipe.entity';
import { EquipeService } from './equipe.service';

describe('EquipeService', () => {
  let service: EquipeService;
  let mapperMock: Partial<EquipeMapper>;
  let modelMock: Partial<Model<EquipeDocument>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipeService],
    })
      .useMocker((token) => {
        if (token === EquipeMapper) {
          const dtos = [
            {
              id: '',
              NomEquipe: '',
              Date: '',
              NomEquipeDomicile: '',
              NomEquipeExterieur: '',
            },
            {
              id: '',
              NomEquipe: '',
              Date: '',
              NomEquipeDomicile: '',
              NomEquipeExterieur: '',
            },
          ];
          mapperMock = {
            mapEntitiesToDtos: jest
              .fn<EquipeDto[], [EquipeEntityWithId[]]>()
              .mockReturnValue(dtos),
            mapEntityToDto: jest
              .fn<EquipeDto, [EquipeEntityWithId]>()
              .mockReturnValue(dtos[0]),
          };
          return mapperMock;
        }
        if (token === getModelToken(EquipeEntity.name)) {
          modelMock = model<EquipeDocument>(EquipeEntity.name, EquipeSchema);
          const entities: EquipeEntityWithId[] = [
            {
              id: '',
              NomEquipe: '',
              NomEquipeDomicile: '',
              NomEquipeExterieur: '',
            },
            {
              id: '',
              NomEquipe: '',
              NomEquipeDomicile: '',
              NomEquipeExterieur: '',
            },
          ];
          mockingoose(modelMock)
            .toReturn(entities, modelMock.find.name)
            .toReturn(10, modelMock.count.name)
            .toReturn(entities[0], modelMock.findOne.name);
          return modelMock;
        }
      })
      .compile();

    service = module.get<EquipeService>(EquipeService);
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
      const id = '6229f9901aaad22d3c834e84';

      const result = service.findOne(id);

      expect(result).toBeInstanceOf(Observable);
    });

    it('should stream object items', (done) => {
      const id = '6229f9901aaad22d3c834e84';

      const result = service.findOne(id);

      result.subscribe((data) => {
        expect(typeof data).toBe('object');
        done();
      });
    });

    it('should call mapper.mapEntityToDto one time', (done) => {
      const id = '6229f9901aaad22d3c834e84';

      const result = service.findOne(id);

      result.subscribe(() => {
        expect(mapperMock.mapEntityToDto).toBeCalledTimes(1);
        done();
      });
    });

    it('should throw an ApiResourceException', (done) => {
      const id = '6229f9901aaad22d3c834e84';
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
      const id = '6229f9901aaad22d3c834e84';
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
