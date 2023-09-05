import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UpdateBookingDto } from './dto/UpdateBookingDto';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() booking: CreateBookingDto) {
    const createdBooking = await this.bookingService.createBooking(booking);
    return { createdBooking, message: 'Booking created successfully' };
  }

  @Get(':id')
  async findBookingById(@Param('id') id: string) {
    return await this.bookingService.findBookingById(id);
  }

  @Put(':id')
  async updateBooking(@Param('id') id: string, @Body() booking: UpdateBookingDto) {
    await this.bookingService.updateBooking(id, booking);
    return { message: 'Booking updated successfully' };
  }
}
