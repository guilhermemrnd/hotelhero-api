import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';

import { HotelEntity } from './hotel.entity';
import { CreateHotelDto } from './dto/CreateHotelDto';
import { SearchHotelsDto } from './dto/SearchHotelsDto';
import { FindHotelDetailsDto } from './dto/FindHotelDetailsDto';
import { UpdateHotelDto } from './dto/UpdateHotelDto';
import { HotelResponseDto } from './dto/HotelResponseDto';
import { HotelService } from './hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post()
  async createHotel(@Body() hotel: CreateHotelDto) {
    const createdHotel = await this.hotelService.createHotel(hotel);
    return { data: createdHotel, message: 'Hotel created successfully' };
  }

  @Get()
  async findHotels(@Query() query: SearchHotelsDto): Promise<HotelResponseDto> {
    return await this.hotelService.findHotels(query);
  }

  @Get('/detail')
  async findHotelDetails(@Query() query: FindHotelDetailsDto): Promise<HotelEntity> {
    return await this.hotelService.findHotelDetails(query);
  }

  @Get(':id')
  async findHotelById(@Param('id') id: string): Promise<HotelEntity> {
    return await this.hotelService.findHotelById(+id);
  }

  @Get(':id/unavailable-dates')
  async findHotelUnavailableDates(@Param('id') hotelId: string): Promise<{ dates: string[] }> {
    return await this.hotelService.findHotelUnavailableDates(+hotelId);
  }

  @Get(':id/bookings')
  async findHotelBookings(@Param('id') hotelId: string) {
    return await this.hotelService.findHotelBookings(+hotelId);
  }

  @Put(':id')
  async updateHotel(@Param('id') id: string, @Body() hotel: UpdateHotelDto) {
    const updatedHotel = await this.hotelService.updateHotel(id, hotel);
    return { data: updatedHotel, message: 'Hotel updated successfully' };
  }
}
