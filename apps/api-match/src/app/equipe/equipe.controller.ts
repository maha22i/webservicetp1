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
import { EquipeService } from '@webservicetp1/api/service/equipe';
import { IsObjectIdPipe } from '@webservicetp1/api/validation/id';
import { PaginationMappedParamsPipe } from '@webservicetp1/api/validation/pagination';
import {
  EquipeCreateDto,
  EquipeDto,
  EquipeResetDto,
  EquipeUpdateDto,
  resourceEquipePath,
} from '@webservicetp1/common/resource/equipe';
import {
  Body,
  CacheInterceptor,
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
  ApiEquipeCreateDto,
  ApiEquipeDto,
  ApiEquipeResetDto,
  ApiEquipeUpdateDto,
  EquipeExample,
} from './equipe.documentation';
import {
  EquipeCreateValidationDto,
  EquipeResetValidationDto,
  EquipeUpdateValidationDto,
} from './equipe.validation';

@ApiTags(resourceEquipePath)
@Controller(resourceEquipePath)
@UseInterceptors(CacheInterceptor)
export class EquipeController {
  constructor(private service: EquipeService) {}

  @Post()
  @ApiBody({ type: ApiEquipeCreateDto })
  @ApiCreatedResponse({ type: ApiEquipeDto })
  @ApiBadRequestResponse()
  create(
    @Body(
      new ValidationPipe({
        expectedType: EquipeCreateValidationDto,
        exceptionFactory: resourceExceptionFactory,
      })
    )
    dto: EquipeCreateDto
  ): Observable<EquipeDto> {
    return this.service.create(dto);
  }

  @Get()
  @UseInterceptors(PaginatedItemsInterceptor)
  @ApiQuery({ name: 'page', type: 'integer', example: 0 })
  @ApiQuery({ name: 'size', type: 'integer', example: 10 })
  @ApiOkResponse({ type: [ApiEquipeDto], headers: { 'X-Total-Count': {} } })
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
  ): Observable<PaginatedItems<EquipeDto>> {
    return this.service.findAll(skip, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: EquipeExample.id })
  @ApiOkResponse({ type: ApiEquipeDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string): Observable<EquipeDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: EquipeExample.id })
  @ApiBody({ type: ApiEquipeUpdateDto })
  @ApiOkResponse({ type: ApiEquipeDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  update(
    @Param('id', IsObjectIdPipe) id: string,
    @Body(
      new ValidationPipe({
        expectedType: EquipeUpdateValidationDto,
        exceptionFactory: resourceExceptionFactory,
      })
    )
    dto: EquipeUpdateDto
  ): Observable<EquipeDto> {
    return this.service.update({ ...dto, id });
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: EquipeExample.id })
  @ApiBody({ type: ApiEquipeResetDto })
  @ApiOkResponse({ type: ApiEquipeDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  reset(
    @Param('id', IsObjectIdPipe) id: string,
    @Body(
      new ValidationPipe({
        expectedType: EquipeResetValidationDto,
        exceptionFactory: resourceExceptionFactory,
      })
    )
    dto: EquipeResetDto
  ): Observable<EquipeDto> {
    return this.service.reset({ ...dto, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', example: EquipeExample.id })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string): Observable<void> {
    return this.service.remove(id);
  }
}
