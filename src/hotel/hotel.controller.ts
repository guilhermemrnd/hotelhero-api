import { Controller, Get, Param } from '@nestjs/common';

import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get(':id/bookings')
  async findHotelBookings(@Param('id') hotelId: string) {
    return await this.hotelService.findHotelBookings(hotelId);
  }
}
