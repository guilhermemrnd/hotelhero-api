import { Controller, Get } from '@nestjs/common';

import { BookingsRepository } from './bookings.repository';

@Controller('bookings')
export class BookingsController {
  constructor(private bookingsRepository: BookingsRepository) {}
}
