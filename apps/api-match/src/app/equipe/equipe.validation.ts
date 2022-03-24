import {
  CreateValidationDtoFactory,
  ResetValidationDtoFactory,
  UpdateValidationDtoFactory,
} from '@webservicetp1/api/validation/core';
import { IsObjectId } from '@webservicetp1/api/validation/id';
import {
  EquipeCreateDto,
  EquipeDto,
  EquipeResetDto,
  EquipeUpdateDto,
} from '@webservicetp1/common/resource/equipe';
// import {
//   IsDateString,
//   IsInt,
//   IsOptional,
//   IsString,
//   Min,
//   MinLength,
// } from 'class-validator';

export class EquipeValidationDto implements EquipeDto {
  DateMatch: string;
  @IsObjectId() id: string;
  @IsObjectId() Date: string;
  @IsObjectId() NomEquipe: string;
  @IsObjectId() NomEquipeDomicile: string;
  @IsObjectId() NomEquipeExterieur: string;
}

export class EquipeCreateValidationDto
  extends CreateValidationDtoFactory(EquipeValidationDto)
  implements EquipeCreateDto {}
export class EquipeUpdateValidationDto
  extends UpdateValidationDtoFactory(EquipeValidationDto)
  implements EquipeUpdateDto {}
export class EquipeResetValidationDto
  extends ResetValidationDtoFactory(EquipeValidationDto)
  implements EquipeResetDto {}
