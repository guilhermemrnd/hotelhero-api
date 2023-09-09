import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RapidAPIService } from './rapid-api.service';

@Module({
  imports: [HttpModule],
  providers: [RapidAPIService],
  exports: [RapidAPIService],
})
export class RapidAPIModule {}
