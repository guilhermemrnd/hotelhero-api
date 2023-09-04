import { Module } from '@nestjs/common';

import { BookingController } from './booking.controller';
import { BookingRepository } from './booking.repository';

@Module({
  controllers: [BookingController],
  providers: [BookingRepository],
})
export class BookingModule {}
