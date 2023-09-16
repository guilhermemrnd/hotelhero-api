import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UpdateBookingDto } from './dto/UpdateBookingDto';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createBooking(@Body() booking: CreateBookingDto) {
    const createdBooking = await this.bookingService.createBooking(booking);
    return { data: createdBooking, message: 'Booking created successfully' };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findBookingById(@Param('id') id: string): Promise<BookingEntity> {
    return await this.bookingService.findBookingById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateBooking(@Param('id') id: string, @Body() newData: UpdateBookingDto) {
    const updatedBooking = await this.bookingService.updateBooking(id, newData);
    return { data: updatedBooking, message: 'Booking updated successfully' };
  }
}
