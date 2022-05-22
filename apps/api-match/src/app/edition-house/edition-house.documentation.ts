import {
  CreateDocumentationDtoFactory,
  ResetDocumentationDtoFactory,
  UpdateDocumentationDtoFactory,
} from '@webservicetp1/api/documentation/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  EditionHouseCreateDto,
  EditionHouseDto,
  EditionHouseResetDto,
  EditionHouseUpdateDto,
} from './edition-house.dto';

export const editionHouseExample: EditionHouseDto = {
  id: '6214c0f2857cfb3569c19166',
};

export class ApiEditionHouseDto implements EditionHouseDto {
  @ApiProperty({ example: editionHouseExample.id }) id: string;
}

export class ApiEditionHouseCreateDto
  extends CreateDocumentationDtoFactory(ApiEditionHouseDto)
  implements EditionHouseCreateDto {}
export class ApiEditionHouseUpdateDto
  extends UpdateDocumentationDtoFactory(ApiEditionHouseDto)
  implements EditionHouseUpdateDto {}
export class ApiEditionHouseResetDto
  extends ResetDocumentationDtoFactory(ApiEditionHouseDto)
  implements EditionHouseResetDto {}
