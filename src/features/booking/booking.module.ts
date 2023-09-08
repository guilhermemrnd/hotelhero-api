import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { BookingEntity } from './booking.entity';
import { UserEntity } from './../user/user.entity';
import { HotelEntity } from './../hotel/hotel.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity, HotelEntity])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
