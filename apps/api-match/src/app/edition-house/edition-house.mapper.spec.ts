import { Test } from '@nestjs/testing';
import { EditionHouseDto } from './edition-house.dto';
import { EditionHouseEntityWithId } from './edition-house.entity';
import { EditionHouseMapper } from './edition-house.mapper';

describe('EditionHouseMapper', () => {
  let mapper: EditionHouseMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EditionHouseMapper],
    }).compile();

    mapper = module.get<EditionHouseMapper>(EditionHouseMapper);
  });

  describe('mapEntityToDto', () => {
    it('should return a dto', () => {
      const entity: EditionHouseEntityWithId = {
        id: '123',
      };
      const expectedDtoStructure: EditionHouseDto = { id: '' };

      const result = mapper.mapEntityToDto(entity);

      expect(result).toBeDefined();
      expect(result).not.toBeNull();
      Object.keys(expectedDtoStructure).forEach((element) => {
        expect(Object.keys(result)).toContain(element);
        expect(typeof result[element]).toBe(
          typeof expectedDtoStructure[element]
        );
      });
    });
  });

  describe('mapEntitiesToDtos', () => {
    it('should return array of Dto', () => {
      const entities: EditionHouseEntityWithId[] = [{}, {}];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeInstanceOf(Array);
    });

    it('should return array of Dto with the same size as array of Entity', () => {
      const entities: EditionHouseEntityWithId[] = [{}, {}];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(entities.length);
    });

    it('should return an empty array', () => {
      const entities: EditionHouseEntityWithId[] = [];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(0);
    });

    it('should return undefined if null array of Entity', () => {
      const entities: EditionHouseEntityWithId[] = null;

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeUndefined();
    });
  });
});
