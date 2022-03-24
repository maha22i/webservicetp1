import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@webservicetp1/common/resource/core';

export interface MatchDto extends Dto {
  Nom: string;
  Date: string;
  Resultat: string;
}

export type MatchCreateDto = CreateDto<MatchDto>;
export type MatchUpdateDto = UpdateDto<MatchDto>;
export type MatchResetDto = ResetDto<MatchDto>;
