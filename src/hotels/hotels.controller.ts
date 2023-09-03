import { Controller } from '@nestjs/common';

import { HotelsRepository } from './hotels.repository';

@Controller('hotels')
export class HotelsController {
  constructor(private hotelRepository: HotelsRepository) {}
}
