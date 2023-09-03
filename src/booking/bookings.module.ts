import { Module } from '@nestjs/common';

import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';

@Module({
  controllers: [BookingsController],
  providers: [BookingsRepository],
})
export class BookingsModule {}
