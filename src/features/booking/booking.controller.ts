import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UpdateBookingDto } from './dto/UpdateBookingDto';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooking(@Body() booking: CreateBookingDto) {
    const createdBooking = await this.bookingService.createBooking(booking);
    return { createdBooking, message: 'Booking created successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findBookingById(@Param('id') id: string): Promise<BookingEntity> {
    return await this.bookingService.findBookingById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBooking(@Param('id') id: string, @Body() newData: UpdateBookingDto) {
    const booking = await this.bookingService.updateBooking(id, newData);
    return { booking, message: 'Booking updated successfully' };
  }
}
