import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

import { IsAmenity } from '../validation/is-amenity.validator';

export class SearchHotelsDto {
  @IsNumberString()
  search: string;

  @IsString()
  checkIn: string;

  @IsString()
  checkOut: string;

  @IsNumberString()
  guests: string;

  @IsNumberString()
  limit: string;

  @IsNumberString()
  page: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: string;

  @IsOptional()
  @IsNumberString()
  maxPrice?: string;

  @IsOptional()
  @IsString({ each: true })
  amenities?: string[];

  @IsOptional()
  @IsString({ each: true })
  @IsIn(['2', '3', '4', '5', 'unrated'], { each: true })
  ratings?: string[];
}
