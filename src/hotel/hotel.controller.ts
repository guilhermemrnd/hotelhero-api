import { Controller, Get } from '@nestjs/common';

import { HotelRepository } from './hotel.repository';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(
    private hotelRepository: HotelRepository,
    private hotelService: HotelService,
  ) {}

}
