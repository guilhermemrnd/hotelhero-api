import { Controller, Get, Query } from '@nestjs/common';

import { RegionService } from './region.service';

@Controller('regions')
export class RegionController {
  constructor(private regionService: RegionService) {}

  @Get()
  async findRegions(@Query('search') query: string) {
    return await this.regionService.findRegions(query);
  }
}
