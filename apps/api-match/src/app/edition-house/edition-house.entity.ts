import {
  EntityDocument,
  EntityWithId,
} from '@webservicetp1/api/repository/core';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'editionHouses' })
export class EditionHouseEntity {}

export type EditionHouseEntityWithId = EntityWithId<EditionHouseEntity>;
export type EditionHouseDocument = EntityDocument<EditionHouseEntity>;
export const EditionHouseSchema =
  SchemaFactory.createForClass(EditionHouseEntity);
