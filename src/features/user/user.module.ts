import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { HotelEntity } from '../hotel/hotel.entity';
import { BookingEntity } from './../booking/booking.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, HotelEntity, BookingEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
