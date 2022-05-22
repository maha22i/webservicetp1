import { paramsExceptionFactory, resourceExceptionFactory } from '@webservicetp1/api/core/abstract';
import { PaginatedItems, PaginatedItemsInterceptor, PaginationMappedParams, PaginationParamsValidation } from '@webservicetp1/api/core/pagination';
import { IsObjectIdPipe } from '@webservicetp1/api/validation/id';
import { PaginationMappedParamsPipe } from '@webservicetp1/api/validation/pagination';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ApiTotoCreateDto, ApiTotoDto, ApiTotoResetDto, ApiTotoUpdateDto, totoExample } from './toto.documentation';
import { TotoCreateDto, TotoDto, TotoResetDto, TotoUpdateDto, resourceTotoPath } from './toto.dto';
import { TotoService } from './toto.service';
import { TotoCreateValidationDto, TotoResetValidationDto, TotoUpdateValidationDto } from './toto.validation';

@ApiTags(resourceTotoPath)
@Controller(resourceTotoPath)
export class TotoController {
  constructor(private service: TotoService) {
  }

  @Post()
  @ApiBody({ type: ApiTotoCreateDto })
  @ApiCreatedResponse({ type: ApiTotoDto })
  @ApiBadRequestResponse()
  create(@Body(new ValidationPipe({ expectedType: TotoCreateValidationDto, exceptionFactory: resourceExceptionFactory })) dto: TotoCreateDto): Observable<TotoDto> {
    return this.service.create(dto);
  }

  @Get()
  @UseInterceptors(PaginatedItemsInterceptor)
  @ApiQuery({ name: 'page', type: 'integer', example: 0 })
  @ApiQuery({ name: 'size', type: 'integer', example: 10 })
  @ApiOkResponse({ type: [ApiTotoDto], headers: { 'X-Total-Count': {} }  })
  findAll(@Query(new ValidationPipe({ transform: true, expectedType: PaginationParamsValidation, exceptionFactory: paramsExceptionFactory }), PaginationMappedParamsPipe) { skip, limit }: PaginationMappedParams): Observable<PaginatedItems<TotoDto>> {
    return this.service.findAll(skip, limit);
  }

  @Get(':id')
  @ApiParam({ name: 'id', example: totoExample.id })
  @ApiOkResponse({ type: ApiTotoDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  findOne(@Param('id', IsObjectIdPipe) id: string): Observable<TotoDto> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', example: totoExample.id  })
  @ApiBody({ type: ApiTotoUpdateDto })
  @ApiOkResponse({ type: ApiTotoDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  update(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe({ expectedType: TotoUpdateValidationDto, exceptionFactory: resourceExceptionFactory })) dto: TotoUpdateDto): Observable<TotoDto> {
    return this.service.update({ ...dto, id });
  }

  @Put(':id')
  @ApiParam({ name: 'id', example: totoExample.id  })
  @ApiBody({ type: ApiTotoResetDto })
  @ApiOkResponse({ type: ApiTotoDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  reset(@Param('id', IsObjectIdPipe) id: string, @Body(new ValidationPipe({ expectedType: TotoResetValidationDto, exceptionFactory: resourceExceptionFactory })) dto: TotoResetDto): Observable<TotoDto> {
    return this.service.reset({ ...dto, id });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({ name: 'id', example: totoExample.id })
  @ApiNoContentResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  remove(@Param('id', IsObjectIdPipe) id: string): Observable<void> {
    return this.service.remove(id);
  }
}
