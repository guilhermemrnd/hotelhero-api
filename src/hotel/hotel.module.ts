import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HotelEntity } from './hotel.entity';
import { HotelController } from './hotel.controller';
import { HotelRepository } from './hotel.repository';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([HotelEntity])],
  controllers: [HotelController],
  providers: [HotelRepository, HotelService],
})
export class HotelModule {}
