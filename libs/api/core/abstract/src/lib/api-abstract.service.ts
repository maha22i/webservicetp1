import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { EntityDocument } from '@webservicetp1/api/repository/core';
import { handleDocumentNotFound } from '@webservicetp1/api/repository/error';
import {
  CreateDto,
  Dto,
  ResetDto,
  UpdateDto,
} from '@webservicetp1/common/resource/core';
import { Model } from 'mongoose';
import {
  catchError,
  combineLatest,
  from,
  map,
  mapTo,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { ApiAbstractMapper } from './api-abstract.mapper';

export abstract class ApiAbstractService<
  TEntity,
  TDto extends Dto,
  TCreateDto = CreateDto<TDto>,
  TUpdateDto = UpdateDto<TDto>,
  TResetDto = ResetDto<TDto>
> {
  protected constructor(
    protected mapper: ApiAbstractMapper<
      TEntity,
      TDto,
      TCreateDto,
      TUpdateDto,
      TResetDto
    >,
    protected model: Model<EntityDocument<TEntity>>
  ) {}

  create(dto: TCreateDto): Observable<TDto> {
    return of(this.mapper.mapCreateDtoToEntity(dto)).pipe(
      switchMap((entity) => this.model.create(entity)),
      map((document) => this.mapper.mapEntityToDto(document))
    );
  }

  findAll(skip: number, limit: number): Observable<PaginatedItems<TDto>> {
    return combineLatest({
      documents: this.model.find().skip(skip).limit(limit).exec(),
      count: this.model.find().count().exec(),
    }).pipe(
      map(({ documents, count }) => ({
        items: this.mapper.mapEntitiesToDtos(documents),
        count,
      }))
    );
  }

  findOne(id: string): Observable<TDto> {
    return from(this.model.findById(id).orFail().exec()).pipe(
      map((document) => this.mapper.mapEntityToDto(document)),
      catchError(handleDocumentNotFound)
    );
  }

  update(dto: TUpdateDto): Observable<TDto> {
    return of(this.mapper.mapUpdateDtoToEntity(dto)).pipe(
      switchMap((entity) =>
        this.model
          .findByIdAndUpdate(entity.id, entity, { new: true })
          .orFail()
          .exec()
      ),
      map((document) => this.mapper.mapEntityToDto(document)),
      catchError(handleDocumentNotFound)
    );
  }

  reset(dto: TResetDto): Observable<TDto> {
    return of(this.mapper.mapResetDtoToEntity(dto)).pipe(
      switchMap((entity) =>
        this.model
          .findByIdAndUpdate(entity.id, entity, { new: true })
          .orFail()
          .exec()
      ),
      map((document) => this.mapper.mapEntityToDto(document)),
      catchError(handleDocumentNotFound)
    );
  }

  remove(id: string): Observable<void> {
    return from(this.model.deleteOne({ _id: id }).orFail().exec()).pipe(
      mapTo(null),
      catchError(handleDocumentNotFound)
    );
  }
}
