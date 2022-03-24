import { ApiAbstractControllerFactory } from '@webservicetp1/api/core/abstract';
import { Controller } from '@nestjs/common';
import {
  EquipeDto,
  resourceEquipePath,
} from '@webservicetp1/common/resource/equipe';
import {
  EquipeCreateValidationDto,
  EquipeResetValidationDto,
  EquipeUpdateValidationDto,
} from './equipe.validation';
import { EquipeEntity } from './equipe.entity';
import {
  ApiEquipeCreateDto,
  ApiEquipeDto,
  ApiEquipeResetDto,
  ApiEquipeUpdateDto,
  EquipeExample,
} from './equipe.documentation';
import { EquipeService } from './equipe.service';

@Controller(resourceEquipePath)
export class EquipeController extends ApiAbstractControllerFactory<
  EquipeEntity,
  EquipeDto
>({
  ValidationCreateDtoClass: EquipeCreateValidationDto,
  ValidationUpdateDtoClass: EquipeUpdateValidationDto,
  ValidationResetDtoClass: EquipeResetValidationDto,
  DocumentationDtoClass: ApiEquipeDto,
  DocumentationCreateDtoClass: ApiEquipeCreateDto,
  DocumentationUpdateDtoClass: ApiEquipeUpdateDto,
  DocumentationResetDtoClass: ApiEquipeResetDto,
  example: EquipeExample,
}) {
  constructor(service: EquipeService) {
    super(service);
  }
}
