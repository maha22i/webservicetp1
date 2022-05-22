import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchEntity, MatchSchema } from './match.entity';
import { MatchMapper } from './match.mapper';
import { MatchService } from './match.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MatchEntity.name,
        schema: MatchSchema,
      },
    ]),
  ],
  providers: [MatchService, MatchMapper],
  exports: [MatchService],
})
export class ApiServiceMatchModule {}
