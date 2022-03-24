import { PaginationMappedParams } from '@webservicetp1/api/core/pagination';
import { PaginationParams } from '@webservicetp1/common/resource/core';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

const defaultValue: PaginationParams = {
  page: 0,
  size: 20,
};

@Injectable()
export class PaginationMappedParamsPipe implements PipeTransform {
  transform(
    params: PaginationParams,
    metadata: ArgumentMetadata
  ): PaginationMappedParams {
    const { page, size }: PaginationParams = {
      page: params.page || defaultValue.page,
      size: params.size || defaultValue.size,
    };
    return {
      skip: page * size,
      limit: size,
    };
  }
}
