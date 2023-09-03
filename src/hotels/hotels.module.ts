import { Module } from '@nestjs/common';

import { HotelsController } from './hotels.controller';
import { HotelsRepository } from './hotels.repository';

@Module({
  imports: [],
  controllers: [HotelsController],
  providers: [HotelsRepository],
})
export class HotelsModule {}
