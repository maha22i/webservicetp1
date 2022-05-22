import { CreateDocumentationDtoFactory, ResetDocumentationDtoFactory, UpdateDocumentationDtoFactory } from '@webservicetp1/api/documentation/core';
import { ApiProperty } from '@nestjs/swagger';
import { TotoCreateDto, TotoDto, TotoResetDto, TotoUpdateDto } from './toto.dto';

export const totoExample: TotoDto = {
  id: '6214c0f2857cfb3569c19166',
}

export class ApiTotoDto implements TotoDto {
  @ApiProperty({ example: totoExample.id }) id: string;
}

export class ApiTotoCreateDto extends CreateDocumentationDtoFactory(ApiTotoDto) implements TotoCreateDto {}
export class ApiTotoUpdateDto extends UpdateDocumentationDtoFactory(ApiTotoDto) implements TotoUpdateDto {}
export class ApiTotoResetDto extends ResetDocumentationDtoFactory(ApiTotoDto) implements TotoResetDto {}

