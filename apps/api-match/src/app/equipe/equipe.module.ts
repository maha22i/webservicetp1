import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipeController } from './equipe.controller';
import { EquipeEntity, EquipeSchema } from './equipe.entity';
import { EquipeMapper } from './equipe.mapper';
import { EquipeService } from './equipe.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EquipeEntity.name,
        schema: EquipeSchema,
      },
    ]),
  ],
  controllers: [EquipeController],
  providers: [EquipeService, EquipeMapper],
})
export class EquipeModule {}
