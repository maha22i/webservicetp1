import {
  paramsExceptionFactory,
  resourceExceptionFactory,
} from '@webservicetp1/api/core/abstract';
import {
  PaginatedItems,
  PaginatedItemsInterceptor,
  PaginationMappedParams,
  PaginationParamsValidation,
} from '@webservicetp1/api/core/pagination';
import { IsObjectIdPipe } from '@webservicetp1/api/validation/id';
import { PaginationMappedParamsPipe } from '@webservicetp1/api/validation/pagination';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  ApiEditionHouseCreateDto,
  ApiEditionHouseDto,
  ApiEditionHouseResetDto,
  ApiEditionHouseUpdateDto,
  editionHouseExample,
} from './edition-house.documentation';
import {
  EditionHouseCreateDto,
  EditionHouseDto,
  EditionHouseResetDto,
  EditionHouseUpdateDto,
  resourceEditionHousePath,
} from './edition-house.dto';
import { EditionHouseService } from './edition-house.service';
import {
  EditionHouseCreateValidationDto,
  EditionHouseResetValidationDto,
  EditionHouseUpdateValidationDto,
} from './edition-house.validation';

@ApiTags(resourceEditionHousePath)
@Controller(resourceEditionHousePath)
export class EditionHouseController {
  constructor(private service: EditionHouseService) {}

  @Post()
  @ApiBody({ type: ApiEditionHouseCreateDto })
  @ApiCreatedResponse({ type: ApiEditionHouseDto })
  @ApiBadRequestResponse()
  create(
    @Body(
      new ValidationPipe({
        expectedType: EditionHouseCreateValidationDto,
        exceptionFactory: resourceExceptionFactory,
      })
    )
    dto: EditionHouseCreateDto
  ): Observable<EditionHouseDto> {
    return this.service.create(dto);
  }

  @Get()
  @UseInterceptors(PaginatedItemsInterceptor)
  @ApiQuery({ name: 'page', type: 'integer', example: 0 })
  @ApiQuery({ name: 'size', type: 'integer', example: 10 })
  @ApiOkResponse({
    type: [ApiEditionHouseDto],
    headers: { 'X-Total-Count': {} },
  })
  findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        expectedType: PaginationParamsValidation,
        exceptionFactory: paramsExceptionFactory,
      }),
      PaginationMappedParamsPipe
    )
    { skip, limit }: PaginationMappedParams
  ): Observable<PaginatedItems<EditionHouseDto>> {
    return this.service.findAll(skip, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: editionHouseExample.id })
  @ApiOkResponse({ type: ApiEditionHouseDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(
    @Param('id', IsObjectIdPipe) id: string
  ): Observable<EditionHouseDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: editionHouseExample.id })
  @ApiBody({ type: ApiEditionHouseUpdateDto })
  @ApiOkResponse({ type: ApiEditionHouseDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body(
      new ValidationPipe({
        expectedType: EditionHouseUpdateValidationDto,
        exceptionFactory: resourceExceptionFactory,
      })
    )
    dto: EditionHouseUpdateDto
  ): Observable<EditionHouseDto> {
    return this.service.update({ ...dto, id });
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: editionHouseExample.id })
  @ApiBody({ type: ApiEditionHouseResetDto })
  @ApiOkResponse({ type: ApiEditionHouseDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  reset(
    @Param('id', IsObjectIdPipe) id: string,
    @Body(
      new ValidationPipe({
        expectedType: EditionHouseResetValidationDto,
        exceptionFactory: resourceExceptionFactory,
      })
    )
    dto: EditionHouseResetDto
  ): Observable<EditionHouseDto> {
    return this.service.reset({ ...dto, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', example: editionHouseExample.id })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string): Observable<void> {
    return this.service.remove(id);
  }
}
