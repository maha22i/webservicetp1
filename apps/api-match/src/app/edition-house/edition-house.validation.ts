import {
  CreateValidationDtoFactory,
  ResetValidationDtoFactory,
  UpdateValidationDtoFactory,
} from '@webservicetp1/api/validation/core';
import { IsObjectId } from '@webservicetp1/api/validation/id';
import {
  EditionHouseCreateDto,
  EditionHouseDto,
  EditionHouseResetDto,
  EditionHouseUpdateDto,
} from './edition-house.dto';

export class EditionHouseValidationDto implements EditionHouseDto {
  @IsObjectId() id: string;
}

export class EditionHouseCreateValidationDto
  extends CreateValidationDtoFactory(EditionHouseValidationDto)
  implements EditionHouseCreateDto {}
export class EditionHouseUpdateValidationDto
  extends UpdateValidationDtoFactory(EditionHouseValidationDto)
  implements EditionHouseUpdateDto {}
export class EditionHouseResetValidationDto
  extends ResetValidationDtoFactory(EditionHouseValidationDto)
  implements EditionHouseResetDto {}
