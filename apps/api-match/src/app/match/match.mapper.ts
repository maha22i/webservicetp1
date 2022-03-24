import { ApiAbstractMapper } from '@webservicetp1/api/core/abstract';
import { Injectable } from '@nestjs/common';
import { MatchEntity, MatchEntityWithId } from './match.entity';
import {
  MatchCreateDto,
  MatchDto,
  MatchResetDto,
  MatchUpdateDto,
} from '@webservicetp1/common/resource/match';

@Injectable()
export class MatchMapper extends ApiAbstractMapper<MatchEntity, MatchDto> {
  mapEntityToDto(document: MatchEntityWithId): MatchDto {
    return {
      id: document.id,
      Nom: document.Nom,
      Date: document.Date,
      Resultat: document.Resultat,
    };
  }

  mapCreateDtoToEntity(dto: MatchCreateDto): MatchEntity {
    return {
      Nom: dto.Nom,
      Date: dto.Date,
      Resultat: dto.Resultat,
    };
  }

  mapUpdateDtoToEntity(dto: MatchUpdateDto): MatchEntityWithId {
    return {
      id: dto.id,
      Nom: dto.Nom,
      Date: dto.Date,
      Resultat: dto.Resultat,
    };
  }

  mapResetDtoToEntity(dto: MatchResetDto): MatchEntityWithId {
    return {
      id: dto.id,
      Nom: dto.Nom ?? null,
      Date: dto.Date ?? null,
      Resultat: dto.Resultat ?? null,
    };
  }
}
