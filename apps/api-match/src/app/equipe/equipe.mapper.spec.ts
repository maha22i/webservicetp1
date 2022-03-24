import { Test } from '@nestjs/testing';
import { EquipeDto } from '@webservicetp1/common/resource/equipe';
import { EquipeEntityWithId } from './equipe.entity';
import { EquipeMapper } from './equipe.mapper';

describe('EquipeMapper', () => {
  let mapper: EquipeMapper;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EquipeMapper],
    }).compile();

    mapper = module.get<EquipeMapper>(EquipeMapper);
  });

  describe('mapEntityToDto', () => {
    it('should return a dto', () => {
      const entity: EquipeEntityWithId = {
        id: '123',
        NomEquipe: 'real',
        NomEquipeDomicile: 'santiago',
        NomEquipeExterieur: 'barça',
      };
      const expectedDtoStructure: EquipeDto = {
        id: '',
        NomEquipe: '',
        NomEquipeDomicile: '',
        NomEquipeExterieur: '',
      };

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

    it('should return a dto with undefined publicationDate', () => {
      const entity: EquipeEntityWithId = {
        NomEquipe: 'real',
        NomEquipeDomicile: 'santiago',
        NomEquipeExterieur: 'barça',
      };

      const result = mapper.mapEntityToDto(entity);

      expect(result.NomEquipe).toBeUndefined();
    });
  });

  describe('mapEntitiesToDtos', () => {
    it('should return array of Dto', () => {
      const entities: EquipeEntityWithId[] = [
        {
          NomEquipe: '',
          id: '',
          NomEquipeDomicile: '',
          NomEquipeExterieur: '',
        },
        {
          NomEquipe: '',
          id: '',
          NomEquipeDomicile: '',
          NomEquipeExterieur: '',
        },
      ];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeInstanceOf(Array);
    });

    it('should return array of Dto with the same size as array of Entity', () => {
      const entities: EquipeEntityWithId[] = [
        {
          NomEquipe: '',
          id: '',
          NomEquipeDomicile: '',
          NomEquipeExterieur: '',
        },
        {
          NomEquipe: '',
          id: '',
          NomEquipeDomicile: '',
          NomEquipeExterieur: '',
        },
      ];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(entities.length);
    });

    it('should return an empty array', () => {
      const entities: EquipeEntityWithId[] = [];

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result.length).toBe(0);
    });

    it('should return undefined if null array of Entity', () => {
      const entities: EquipeEntityWithId[] = null;

      const result = mapper.mapEntitiesToDtos(entities);

      expect(result).toBeUndefined();
    });
  });
});
