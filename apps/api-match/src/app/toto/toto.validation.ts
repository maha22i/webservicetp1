import { CreateValidationDtoFactory, ResetValidationDtoFactory, UpdateValidationDtoFactory } from '@webservicetp1/api/validation/core';
import { IsObjectId } from '@webservicetp1/api/validation/id';
import { TotoCreateDto, TotoDto, TotoResetDto, TotoUpdateDto } from './toto.dto';

export class TotoValidationDto implements TotoDto {
  @IsObjectId() id: string;
}

export class TotoCreateValidationDto extends CreateValidationDtoFactory(TotoValidationDto) implements TotoCreateDto {}
export class TotoUpdateValidationDto extends UpdateValidationDtoFactory(TotoValidationDto) implements TotoUpdateDto {}
export class TotoResetValidationDto extends ResetValidationDtoFactory(TotoValidationDto) implements TotoResetDto {}

