import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateHotelDto } from './dto/CreateHotelDto';
import { SearchHotelsDto } from './dto/SearchHotelsDto';
import { UpdateHotelDto } from './dto/UpdateHotelDto';
import { HotelEntity } from './hotel.entity';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post()
  async createHotel(@Body() hotel: CreateHotelDto) {
    const createdHotel = await this.hotelService.createHotel(hotel);
    return { createdHotel, message: 'Hotel created successfully' };
  }

  @Get()
  async findHotels(@Query() query: SearchHotelsDto): Promise<HotelEntity[]> {
    return await this.hotelService.findHotels(query);
  }

  @Get(':id')
  async findHotelById(@Param('id') id: string): Promise<HotelEntity> {
    return await this.hotelService.findHotelById(+id);
  }

  @Get(':id/bookings')
  async findHotelBookings(@Param('id') hotelId: string) {
    return await this.hotelService.findHotelBookings(+hotelId);
  }

  @Put(':id')
  async updateHotel(@Param('id') id: string, @Body() hotel: UpdateHotelDto) {
    const updatedHotel = await this.hotelService.updateHotel(+id, hotel);
    return { updatedHotel, message: 'Hotel updated successfully' };
  }
}
