import {
  CreateDocumentationDtoFactory,
  ResetDocumentationDtoFactory,
  UpdateDocumentationDtoFactory,
} from '@webservicetp1/api/documentation/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  EquipeCreateDto,
  EquipeDto,
  EquipeResetDto,
  EquipeUpdateDto,
} from '@webservicetp1/common/resource/equipe';

export const EquipeExample: EquipeDto = {
  id: '6229f8f41aaad22d3c834e83',
  NomEquipe: 'Real Madrid',
  NomEquipeDomicile: 'psg',
  NomEquipeExterieur: 'barcelone',
};

export class ApiEquipeDto implements EquipeDto {
  @ApiProperty({ example: EquipeExample.id }) id: string;
  @ApiProperty({ example: EquipeExample.NomEquipe }) NomEquipe: string;
  @ApiProperty({ example: EquipeExample.NomEquipeDomicile })
  NomEquipeDomicile: string;
  @ApiProperty({ example: EquipeExample.NomEquipeExterieur })
  NomEquipeExterieur: string;
}

export class ApiEquipeCreateDto
  extends CreateDocumentationDtoFactory(ApiEquipeDto)
  implements EquipeCreateDto {}
export class ApiEquipeUpdateDto
  extends UpdateDocumentationDtoFactory(ApiEquipeDto)
  implements EquipeUpdateDto {}
export class ApiEquipeResetDto
  extends ResetDocumentationDtoFactory(ApiEquipeDto)
  implements EquipeResetDto {}
