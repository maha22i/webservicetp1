import {
  EntityDocument,
  EntityWithId,
} from '@webservicetp1/api/repository/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'equipe' })
export class EquipeEntity {
  @Prop({ required: true }) NomEquipe: string;
  @Prop() NomEquipeDomicile: string;
  @Prop() NomEquipeExterieur: string;
}

export type EquipeEntityWithId = EntityWithId<EquipeEntity>;
export type EquipeDocument = EntityDocument<EquipeEntity>;
export const EquipeSchema = SchemaFactory.createForClass(EquipeEntity);
