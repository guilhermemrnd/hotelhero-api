import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity } from './hotel.entity';
import { BookingEntity } from './../booking/booking.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async findHotelBookings(hotelId: string): Promise<BookingEntity[]> {
    return await this.bookingRepository.find({ where: { hotel: { id: hotelId } } });
  }
}
