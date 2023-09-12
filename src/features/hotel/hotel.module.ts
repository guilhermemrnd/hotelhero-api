import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RapidAPIModule } from './../../common/rapid-api/rapid-api.module';
import { HotelEntity } from './hotel.entity';
import { RegionEntity } from '../region/region.entity';
import { AmenityEntity } from './amenity.entity';
import { BookingEntity } from './../booking/booking.entity';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HotelEntity, RegionEntity, AmenityEntity, BookingEntity]),
    RapidAPIModule,
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
