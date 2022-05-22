import {
  EntityDocument,
  EntityWithId,
} from '@webservicetp1/api/repository/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'match' })
export class MatchEntity {
  @Prop({ required: true })
  Nom!: string;
  @Prop({ required: true, type: Date })
  Date!: Date;
  @Prop({ required: true })
  Resultat!: string;
}

export type MatchEntityWithId = EntityWithId<MatchEntity>;
export type MatchDocument = EntityDocument<MatchEntity>;
export const MatchSchema = SchemaFactory.createForClass(MatchEntity);
