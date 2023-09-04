import { Module } from '@nestjs/common';

import { HotelController } from './hotel.controller';
import { HotelRepository } from './hotel.repository';

@Module({
  imports: [],
  controllers: [HotelController],
  providers: [HotelRepository],
})
export class HotelModule {}
