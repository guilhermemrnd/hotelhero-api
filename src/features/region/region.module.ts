import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RapidAPIModule } from './../../common/rapid-api/rapid-api.module';
import { RegionEntity } from './region.entity';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegionEntity]), RapidAPIModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
