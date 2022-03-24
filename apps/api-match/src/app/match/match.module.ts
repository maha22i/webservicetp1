import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchController } from './match.controller';
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
  controllers: [MatchController],
  providers: [MatchService, MatchMapper],
})
export class MatchModule {}
