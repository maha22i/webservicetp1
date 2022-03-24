import {
  CreateDto,
  ResetDto,
  UpdateDto,
} from '@webservicetp1/common/resource/core';

export interface EquipeDto {
  id: string;
  NomEquipe: string;
  NomEquipeDomicile: string;
  NomEquipeExterieur: string;
}
export type EquipeCreateDto = CreateDto<EquipeDto>;
export type EquipeUpdateDto = UpdateDto<EquipeDto>;
export type EquipeResetDto = ResetDto<EquipeDto>;
