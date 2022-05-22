import { ApiAbstractService } from '@webservicetp1/api/core/abstract';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MatchDocument, MatchEntity } from './match.entity';
import { MatchDto } from '@webservicetp1/common/resource/match';
import { MatchMapper } from './match.mapper';

@Injectable()
export class MatchService extends ApiAbstractService<MatchEntity, MatchDto> {
  constructor(
    mapper: MatchMapper,
    @InjectModel(MatchEntity.name) model: Model<MatchDocument>
  ) {
    super(mapper, model);
  }
}
