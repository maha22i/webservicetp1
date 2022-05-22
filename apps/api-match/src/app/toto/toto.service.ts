import { PaginatedItems } from '@webservicetp1/api/core/pagination';
import { handleDocumentNotFound } from '@webservicetp1/api/repository/error';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { catchError, combineLatest, from, map, mapTo, Observable, of, switchMap } from 'rxjs';
import { TotoCreateDto, TotoDto, TotoResetDto, TotoUpdateDto } from './toto.dto';
import { TotoDocument, TotoEntity } from './toto.entity';
import { TotoMapper } from './toto.mapper';

@Injectable()
export class TotoService  {

  constructor(
    private mapper: TotoMapper,
    @InjectModel(TotoEntity.name) private model: Model<TotoDocument>
  ) {
  }

  create(dto: TotoCreateDto): Observable<TotoDto> {
    return of(this.mapper.mapCreateDtoToEntity(dto))
      .pipe(
        switchMap(entity => this.model.create(entity)),
        map(document => this.mapper.mapEntityToDto(document)));
  }

  findAll(skip: number, limit: number): Observable<PaginatedItems<TotoDto>> {
    return combineLatest({
      documents: this.model.find().skip(skip).limit(limit).exec(),
      count: this.model.find().count().exec()
    })
      .pipe(
        map(({ documents, count }) => ({
          items: this.mapper.mapEntitiesToDtos(documents),
          count
        })));
  }

  findOne(id: string): Observable<TotoDto> {
    return from(this.model.findById(id).orFail().exec())
      .pipe(
        map(document => this.mapper.mapEntityToDto(document)),
        catchError(handleDocumentNotFound));
  }

  update(dto: TotoUpdateDto): Observable<TotoDto> {
    return of(this.mapper.mapUpdateDtoToEntity(dto))
      .pipe(
        switchMap(entity => this.model.findByIdAndUpdate(entity.id, entity, { new: true }).orFail().exec()),
        map(document => this.mapper.mapEntityToDto(document)),
        catchError(handleDocumentNotFound));
  }

  reset(dto: TotoResetDto): Observable<TotoDto> {
    return of(this.mapper.mapResetDtoToEntity(dto))
      .pipe(
        switchMap(entity => this.model.findByIdAndUpdate(entity.id, entity, { new: true }).orFail().exec()),
        map(document => this.mapper.mapEntityToDto(document)),
        catchError(handleDocumentNotFound));
  }

  remove(id: string): Observable<void> {
    return from(this.model.deleteOne({ _id: id }).orFail().exec())
      .pipe(
        mapTo(null),
        catchError(handleDocumentNotFound))
  }
}
