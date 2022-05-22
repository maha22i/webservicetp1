import { ApiAbstractMapper } from '@webservicetp1/api/core/abstract';
import { Injectable } from '@nestjs/common';
import {
  EquipeCreateDto,
  EquipeDto,
  EquipeResetDto,
  EquipeUpdateDto,
} from '@webservicetp1/common/resource/equipe';
import {
  EquipeEntity,
  EquipeEntityWithId,
} from './equipe.entity';
import { Logger } from '@nestjs/common';
import { Log } from '@webservicetp1/api/core/logging';
// import { EntityWithId } from '@webservicetp1/api/repository/core';

export const EquipeDocumentToDto = (
  document: EquipeEntityWithId
): EquipeDto => ({
  id: document.id,
  NomEquipe: document.NomEquipe,
  NomEquipeDomicile: document.NomEquipeDomicile,
  NomEquipeExterieur: document.NomEquipeExterieur,
});

export const EquipeCreateDtoToEntity = (
  dto: EquipeCreateDto
): EquipeEntity => ({
  NomEquipe: dto.NomEquipe,
  NomEquipeDomicile: dto.NomEquipeDomicile,
  NomEquipeExterieur: dto.NomEquipeExterieur,
});

export const EquipeUpdateDtoToEntity = (
  dto: EquipeUpdateDto
): EquipeEntityWithId => ({
  id: dto.id,
  NomEquipe: dto.NomEquipe,
  NomEquipeDomicile: dto.NomEquipeDomicile,
  NomEquipeExterieur: dto.NomEquipeExterieur,
});

export const EquipeResetDtoToEntity = (
  dto: EquipeResetDto
): EquipeEntityWithId => ({
  id: dto.id,
  NomEquipe: dto.NomEquipe ?? null,
  NomEquipeDomicile: dto.NomEquipeDomicile ?? null,
  NomEquipeExterieur: dto.NomEquipeExterieur ?? null,
});

@Injectable()
export class EquipeMapper extends ApiAbstractMapper<EquipeEntity, EquipeDto> {
  protected logger = new Logger(EquipeMapper.name);
  @Log()
  mapEntityToDto(document: EquipeEntityWithId): EquipeDto {
    return EquipeDocumentToDto(document);
  }
  @Log()
  mapCreateDtoToEntity(dto: EquipeCreateDto): EquipeEntity {
    return EquipeCreateDtoToEntity(dto);
  }
  @Log()
  mapUpdateDtoToEntity(dto: EquipeUpdateDto): EquipeEntityWithId {
    return EquipeUpdateDtoToEntity(dto);
  }
  @Log()
  mapResetDtoToEntity(dto: EquipeUpdateDto): EquipeEntityWithId {
    return EquipeResetDtoToEntity(dto);
  }
}
