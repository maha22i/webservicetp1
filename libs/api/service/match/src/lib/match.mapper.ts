import { ApiAbstractMapper } from '@webservicetp1/api/core/abstract';
import { Injectable, Logger } from '@nestjs/common';
import {
  MatchCreateDto,
  MatchDto,
  MatchResetDto,
  MatchUpdateDto,
} from '@webservicetp1/common/resource/match';
import { MatchEntity, MatchEntityWithId } from './match.entity';

@Injectable()
export class MatchMapper extends ApiAbstractMapper<MatchEntity, MatchDto> {
  protected logger = new Logger(MatchMapper.name);

  mapEntityToDto(document: MatchEntityWithId): MatchDto {
    return {
      id: document.id,
      Nom: document.Nom,
      Date: document.Date?.toISOString(),
      Resultat: document.Resultat,
    };
  }

  mapCreateDtoToEntity(dto: MatchCreateDto): MatchEntity {
    return {
      Nom: dto.Nom,
      Date: dto.Date && new Date(dto.Date),
      Resultat: dto.Resultat,
    };
  }

  mapUpdateDtoToEntity(dto: MatchUpdateDto): MatchEntityWithId {
    return {
      id: dto.id,
      Nom: dto.Nom,
      Date: dto.Date && new Date(dto.Date),
      Resultat: dto.Resultat,
    };
  }

  mapResetDtoToEntity(dto: MatchResetDto): MatchEntityWithId {
    return {
      id: dto.id,
      Nom: dto.Nom,
      Date: dto.Date ? new Date(dto.Date) : null,
      Resultat: dto.Resultat ?? null,
    };
  }
}
