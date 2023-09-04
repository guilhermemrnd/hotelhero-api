import { Controller, Get } from '@nestjs/common';

import { BookingRepository } from './booking.repository';

@Controller('bookings')
export class BookingController {
  constructor(private bookingRepository: BookingRepository) {}
}
