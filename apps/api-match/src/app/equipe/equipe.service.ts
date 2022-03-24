import { ApiAbstractService } from '@webservicetp1/api/core/abstract';
import { EquipeDto } from '@webservicetp1/common/resource/equipe';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EquipeMapper } from './equipe.mapper';
import { EquipeDocument, EquipeEntity } from './equipe.entity';

@Injectable()
export class EquipeService extends ApiAbstractService<EquipeEntity, EquipeDto> {
  constructor(
    mapper: EquipeMapper,
    @InjectModel(EquipeEntity.name) model: Model<EquipeDocument>
  ) {
    super(mapper, model);
  }
}
