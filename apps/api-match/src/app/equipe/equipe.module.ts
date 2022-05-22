import { CacheModule, Module } from '@nestjs/common';
import { ApiServiceEquipeModule } from '@webservicetp1/api/service/equipe';
import { EquipeController } from './equipe.controller';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60,
      max: 10,
    }),
    ApiServiceEquipeModule,
  ],
  controllers: [EquipeController],
})
export class EquipeModule {}
