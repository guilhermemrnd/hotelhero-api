import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookingEntity } from './booking.entity';
import { UserEntity } from './../user/user.entity';
import { HotelEntity } from './../hotel/hotel.entity';
import { CreateBookingDto } from './dto/CreateBookingDto';
import { UpdateBookingDto } from './dto/UpdateBookingDto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
  ) {}

  public async createBooking(booking: CreateBookingDto): Promise<BookingEntity> {
    const user = await this.userRepository.findOneBy({ id: booking.userId });
    if (!user) throw new NotFoundException('User not found');

    const hotel = await this.hotelRepository.findOneBy({ id: booking.hotelId });
    if (!hotel) throw new NotFoundException('Hotel not found');

    const bookingEntity = new BookingEntity();

    bookingEntity.user = user;
    bookingEntity.hotel = hotel;
    bookingEntity.checkIn = booking.checkIn;
    bookingEntity.checkOut = booking.checkOut;
    bookingEntity.numberOfGuests = booking.numberOfGuests;
    bookingEntity.totalCost = booking.totalCost;
    bookingEntity.bookingStatus = booking.bookingStatus;

    return await this.bookingRepository.save(bookingEntity);
  }

  public async findBookingById(id: string): Promise<BookingEntity> {
    const booking = await this.bookingRepository.findOneBy({ id });

    if (!booking) throw new NotFoundException('Booking not found');

    return booking;
  }

  public async updateBooking(id: string, newData: UpdateBookingDto): Promise<BookingEntity> {
    const booking = await this.findBookingById(id);

    Object.assign(booking, newData);

    return await this.bookingRepository.save(booking);
  }
}
