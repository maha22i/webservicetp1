import {
  CreateValidationDtoFactory,
  ResetValidationDtoFactory,
  UpdateValidationDtoFactory,
} from '@webservicetp1/api/validation/core';
import { IsObjectId } from '@webservicetp1/api/validation/id';
import {
  MatchCreateDto,
  MatchDto,
  MatchResetDto,
  MatchUpdateDto,
} from '@webservicetp1/common/resource/match';
import { IsString } from 'class-validator';

export class MatchValidation implements MatchDto {
  @IsObjectId() id: string;
  @IsString() Nom: string;
  @IsString() Date: string;
  @IsString() Resultat: string;
}

export class MatchCreateValidationDto
  extends CreateValidationDtoFactory(MatchValidation)
  implements MatchCreateDto {}
export class MatchUpdateValidationDto
  extends UpdateValidationDtoFactory(MatchValidation)
  implements MatchUpdateDto {}
export class MatchResetValidationDto
  extends ResetValidationDtoFactory(MatchValidation)
  implements MatchResetDto {}
