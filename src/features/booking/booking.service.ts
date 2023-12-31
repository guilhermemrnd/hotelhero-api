import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
    const { user, hotel } = await this.findUserAndHotel(booking.userId, +booking.hotelId);

    const existingBooking = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.hotel', 'hotel')
      .where('hotel.id = :hotelId', { hotelId: +booking.hotelId })
      .andWhere(
        '(booking.checkIn <= :checkIn AND booking.checkOut > :checkIn) OR ' +
          '(booking.checkIn < :checkOut AND booking.checkOut >= :checkOut) OR ' +
          '(booking.checkIn >= :checkIn AND booking.checkOut <= :checkOut)',
        {
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        },
      )
      .getOne();

    if (existingBooking) {
      throw new ConflictException('An overlapping booking already exists for this hotel.');
    }

    const bookingEntity = this.createBookingEntity(user, hotel, booking);
    bookingEntity.id = await this.generateUniqueId();

    return await this.bookingRepository.save(bookingEntity);
  }

  public async findBookingById(id: string): Promise<BookingEntity> {
    const booking = await this.bookingRepository.findOne({ where: { id }, relations: ['hotel'] });

    if (!booking) throw new NotFoundException('Booking not found');

    return booking;
  }

  public async updateBooking(id: string, newData: UpdateBookingDto): Promise<BookingEntity> {
    const booking = await this.bookingRepository.findOneBy({ id });
    if (!booking) throw new NotFoundException('Booking not found');

    Object.assign(booking, newData as BookingEntity);
    return await this.bookingRepository.save(booking);
  }

  public async finalizeBooking(bookingId: string, paymentId: string): Promise<BookingEntity> {
    const booking = await this.findBookingById(bookingId);

    booking.isPaid = true;
    booking.paymentId = paymentId;

    return await this.bookingRepository.save(booking);
  }

  private async findUserAndHotel(userId: string, hotelId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
    if (!hotel) throw new NotFoundException('Hotel not found');

    return { user, hotel };
  }

  private createBookingEntity(user: UserEntity, hotel: HotelEntity, booking: CreateBookingDto) {
    return this.bookingRepository.create({ ...booking, user: user, hotel });
  }

  private async generateUniqueId(): Promise<string> {
    const maxRetries = 5;
    let retries = 0;

    while (retries < maxRetries) {
      const generatedId = this.generateCustomId();
      const exists = await this.checkIdUniqueness(generatedId);

      if (!exists) return generatedId;

      retries++;
    }

    throw new Error('Failed to generate unique id');
  }

  private generateCustomId(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    return result;
  }

  private async checkIdUniqueness(id: string): Promise<boolean> {
    const existingId = await this.bookingRepository.findOneBy({ id });
    return !!existingId;
  }
}
