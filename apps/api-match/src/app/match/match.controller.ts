import { ApiAbstractControllerFactory } from '@webservicetp1/api/core/abstract';
import {
  MatchDto,
  resourceMatchPath,
} from '@webservicetp1/common/resource/match';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatchEntity } from './match.entity';
import { MatchService } from './match.service';
import {
  ApiMatchCreateDto,
  ApiMatchDto,
  ApiMatchResetDto,
  ApiMatchUpdateDto,
  MatchExample,
} from './match.documentation';
import {
  MatchCreateValidationDto,
  MatchResetValidationDto,
  MatchUpdateValidationDto,
} from './match.validation';
@ApiTags(resourceMatchPath)
@Controller(resourceMatchPath)
export class MatchController extends ApiAbstractControllerFactory<
  MatchEntity,
  MatchDto
>({
  ValidationCreateDtoClass: MatchCreateValidationDto,
  ValidationUpdateDtoClass: MatchUpdateValidationDto,
  ValidationResetDtoClass: MatchResetValidationDto,
  DocumentationDtoClass: ApiMatchDto,
  DocumentationCreateDtoClass: ApiMatchCreateDto,
  DocumentationUpdateDtoClass: ApiMatchUpdateDto,
  DocumentationResetDtoClass: ApiMatchResetDto,
  example: MatchExample,
}) {
  constructor(service: MatchService) {
    super(service);
  }
}
