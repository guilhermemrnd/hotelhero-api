import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HotelEntity } from './hotel.entity';

@Injectable()
export class HotelService {
  constructor(@InjectRepository(HotelEntity) private readonly hotelRepository: Repository<HotelEntity>) {}
}
