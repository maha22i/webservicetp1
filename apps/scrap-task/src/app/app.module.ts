import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { ScrapService } from './scarp/scrap.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ScrapService],
})
export class AppModule {}
