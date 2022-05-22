import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TotoEntity, TotoSchema } from './toto.entity';
import { TotoController } from './toto.controller';
import { TotoMapper } from './toto.mapper';
import { TotoService } from './toto.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TotoEntity.name,
        schema: TotoSchema
      }
    ])
  ],
  controllers: [TotoController],
  providers: [TotoMapper, TotoService]
})
export class TotoModule {}
