import {
  CreateDocumentationDtoFactory,
  ResetDocumentationDtoFactory,
  UpdateDocumentationDtoFactory,
} from '@webservicetp1/api/documentation/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  MatchCreateDto,
  MatchDto,
  MatchResetDto,
  MatchUpdateDto,
} from '@webservicetp1/common/resource/match';

export const MatchExample: MatchDto = {
  id: '6214c0f2857cfb3569c19166',
  Nom: 'real vs barça',
  Date: '12-02-2010',
  Resultat: '1-5',
};

export class ApiMatchDto implements MatchDto {
  @ApiProperty({ example: MatchExample.id }) id: string;
  @ApiProperty({ example: MatchExample.Nom }) Nom: string;
  @ApiProperty({ example: MatchExample.Date }) Date: string;
  @ApiProperty({ example: MatchExample.Resultat }) Resultat: string;
}

export class ApiMatchCreateDto
  extends CreateDocumentationDtoFactory(ApiMatchDto)
  implements MatchCreateDto {}
export class ApiMatchUpdateDto
  extends UpdateDocumentationDtoFactory(ApiMatchDto)
  implements MatchUpdateDto {}
export class ApiMatchResetDto
  extends ResetDocumentationDtoFactory(ApiMatchDto)
  implements MatchResetDto {}
