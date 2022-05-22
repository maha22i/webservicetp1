import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EditionHouseEntity, EditionHouseSchema } from './edition-house.entity';
import { EditionHouseController } from './edition-house.controller';
import { EditionHouseMapper } from './edition-house.mapper';
import { EditionHouseService } from './edition-house.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EditionHouseEntity.name,
        schema: EditionHouseSchema,
      },
    ]),
  ],
  controllers: [EditionHouseController],
  providers: [EditionHouseMapper, EditionHouseService],
})
export class EditionHouseModule {}
