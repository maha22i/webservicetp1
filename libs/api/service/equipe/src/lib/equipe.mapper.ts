import { ApiAbstractMapper } from '@webservicetp1/api/core/abstract';
import { Log } from '@webservicetp1/api/core/logging';
import { Injectable, Logger } from '@nestjs/common';
import {
  EquipeCreateDto,
  EquipeDto,
  EquipeUpdateDto,
} from '@webservicetp1/common/resource/equipe';
import { EquipeEntity, EquipeEntityWithId } from './equipe.entity';

@Injectable()
export class EquipeMapper extends ApiAbstractMapper<EquipeEntity, EquipeDto> {
  protected logger = new Logger(EquipeMapper.name);

  @Log()
  mapEntityToDto(document: EquipeEntityWithId): EquipeDto {
    return {
      id: document.id,
      NomEquipe: document.NomEquipe,
      NomEquipeDomicile: document.NomEquipeDomicile,
      NomEquipeExterieur: document.NomEquipeExterieur,
    };
  }

  @Log()
  mapCreateDtoToEntity(dto: EquipeCreateDto): EquipeEntity {
    return {
      NomEquipe: dto.NomEquipe,
      NomEquipeDomicile: dto.NomEquipeDomicile,
      NomEquipeExterieur: dto.NomEquipeExterieur,
    };
  }

  @Log()
  mapUpdateDtoToEntity(dto: EquipeUpdateDto): EquipeEntityWithId {
    return {
      id: dto.id,
      NomEquipe: 'dto.NomEquipe',
      NomEquipeDomicile: 'dto.NomEquipeDomicile',
      NomEquipeExterieur: 'dto.NomEquipeExterieur',
    };
  }

  @Log()
  mapResetDtoToEntity(dto: EquipeUpdateDto): EquipeEntityWithId {
    return {
      id: dto.id,
      NomEquipe: 'to.NomEquipe ?? null',
      NomEquipeDomicile: 'dto.NomEquipeDomicile ?? null',
      NomEquipeExterieur: 'dto.NomEquipeExterieur ?? null',
    };
  }
}
