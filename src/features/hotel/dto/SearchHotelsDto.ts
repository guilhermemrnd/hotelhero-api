import { IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';

import { IsDateStringFormat } from '../validation/is-date-string-format.validator';
import { IsAmenity } from '../validation/is-amenity.validator';

export class SearchHotelsDto {
  @IsNumberString()
  search: string;

  @IsString()
  @IsDateStringFormat()
  checkIn: string;

  @IsString()
  @IsDateStringFormat()
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
