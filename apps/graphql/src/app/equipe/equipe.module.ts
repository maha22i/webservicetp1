import { ApiServiceMatchModule } from '@webservicetp1/api/service/match';
import { ApiServiceEquipeModule } from '@webservicetp1/api/service/equipe';
import { Module } from '@nestjs/common';
import { EquipeResolver } from './equipe.resolver';

@Module({
  imports: [ApiServiceEquipeModule, ApiServiceMatchModule],
  providers: [EquipeResolver],
})
export class EquipeModule {}
