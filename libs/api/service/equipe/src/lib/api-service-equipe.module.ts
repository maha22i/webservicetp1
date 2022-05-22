import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  providers: [EquipeService, EquipeMapper],
  exports: [EquipeService],
})
export class ApiServiceEquipeModule {}
