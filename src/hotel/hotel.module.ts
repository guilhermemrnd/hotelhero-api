import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelEntity } from './hotel.entity';
import { BookingEntity } from './../booking/booking.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity, BookingEntity])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
