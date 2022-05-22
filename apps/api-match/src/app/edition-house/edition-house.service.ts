import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { handleDocumentNotFound } from '@webservicetp1/api/repository/error';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
import {
  EditionHouseCreateDto,
  EditionHouseDto,
  EditionHouseResetDto,
  EditionHouseUpdateDto,
} from './edition-house.dto';
import {
  EditionHouseDocument,
  EditionHouseEntity,
} from './edition-house.entity';
import { EditionHouseMapper } from './edition-house.mapper';

@Injectable()
export class EditionHouseService {
  constructor(
    private mapper: EditionHouseMapper,
    @InjectModel(EditionHouseEntity.name)
    private model: Model<EditionHouseDocument>
  ) {}

  create(dto: EditionHouseCreateDto): Observable<EditionHouseDto> {
    return of(this.mapper.mapCreateDtoToEntity(dto)).pipe(
      switchMap((entity) => this.model.create(entity)),
      map((document) => this.mapper.mapEntityToDto(document))
    );
  }

  findAll(
    skip: number,
    limit: number
  ): Observable<PaginatedItems<EditionHouseDto>> {
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

  findOne(id: string): Observable<EditionHouseDto> {
    return from(this.model.findById(id).orFail().exec()).pipe(
      map((document) => this.mapper.mapEntityToDto(document)),
      catchError(handleDocumentNotFound)
    );
  }

  update(dto: EditionHouseUpdateDto): Observable<EditionHouseDto> {
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

  reset(dto: EditionHouseResetDto): Observable<EditionHouseDto> {
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
