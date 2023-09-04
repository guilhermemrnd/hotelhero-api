import { Controller } from '@nestjs/common';

import { HotelRepository } from './hotel.repository';

@Controller('hotels')
export class HotelController {
  constructor(private hotelRepository: HotelRepository) {}
}
