import { EntityDocument, EntityWithId } from '@webservicetp1/api/repository/core';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'totos' })
export class TotoEntity {
}

export type TotoEntityWithId = EntityWithId<TotoEntity>;
export type TotoDocument = EntityDocument<TotoEntity>;
export const TotoSchema = SchemaFactory.createForClass(TotoEntity);
