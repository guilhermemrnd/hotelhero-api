import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom, map, Observable } from 'rxjs';

import { RegionEntity } from './region.entity';
import { RapidAPIService } from '../../common/rapid-api/rapid-api.service';
import { LocationsResponse } from '../../common/rapid-api/interfaces/locations-response';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
    private readonly rapidAPIService: RapidAPIService,
  ) {}

  public async findRegions(location: string): Promise<RegionEntity[]> {
    const regions = await this.regionRepository.find({ where: { name: location } });

    if (regions.length === 0) {
      const apiData = await this.fetchFromRapidAPI(location);

      if (!apiData) return [];

      const regionEntities = apiData?.map((region) => {
        return this.regionRepository.create({
          id: Number(region.dest_id),
          name: region.label,
        });
      });

      return await this.regionRepository.save(regionEntities);
    }

    return regions;
  }

  private async fetchFromRapidAPI(location: string) {
    const regions = await firstValueFrom(this.rapidAPIService.fetchRegions(location));
    return regions?.filter((region) => region.dest_type === 'city') ?? [];
  }
}
