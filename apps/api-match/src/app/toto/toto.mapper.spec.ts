import { Test } from '@nestjs/testing';
import { TotoDto } from './toto.dto';
import { TotoEntityWithId } from './toto.entity';
import { TotoMapper } from './toto.mapper';

describe('TotoMapper', () => {
  let mapper: TotoMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TotoMapper],
    }).compile();

    mapper = module.get<TotoMapper>(TotoMapper);
  });

  describe('mapEntityToDto', () => {
    it('should return a dto', () => {
      const entity: TotoEntityWithId = {
        id: '123',
      };
      const expectedDtoStructure: TotoDto = { id: '' };

      const result = mapper.mapEntityToDto(entity);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      Object.keys(expectedDtoStructure).forEach(element => {
        expect(Object.keys(result)).toContain(element);
        expect(typeof result[element]).toBe(typeof expectedDtoStructure[element]);
      });
    });
  });

  describe('mapEntitiesToDtos', () => {
    it('should return array of Dto', () => {
      const entities: TotoEntityWithId[] = [
        {  },
        {  },
      ];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeInstanceOf(Array);
    });

    it('should return array of Dto with the same size as array of Entity', () => {
      const entities: TotoEntityWithId[] = [
        {  },
        {  },
      ];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(entities.length);
    });

    it('should return an empty array', () => {
      const entities: TotoEntityWithId[] = [];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(0);
    });

    it('should return undefined if null array of Entity', () => {
      const entities: TotoEntityWithId[] = null;

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeUndefined();
    });
  })
});
