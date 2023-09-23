import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';

import { BookingEntity } from './booking.entity';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UpdateBookingDto } from './dto/UpdateBookingDto';
import { FinalizeBookingDto } from './dto/FinalizeBookingDto';

import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @Patch(':id/finalize')
  @UseGuards(JwtAuthGuard)
  async finalizeBooking(@Param('id') bookingId: string, @Body() body: FinalizeBookingDto) {
    const finalizedBooking = await this.bookingService.finalizeBooking(bookingId, body.paymentId);
    return { data: finalizedBooking, message: 'Booking finalized successfully' };
  }
}
