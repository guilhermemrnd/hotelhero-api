import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

import { IsAmenity } from '../validation/is-amenity.validator';

export class SearchHotelsDto {
  @IsString()
  search: string;

  @IsString()
  checkIn: string;

  @IsString()
  checkOut: string;

  @IsInt()
  guests: number;

  @IsInt()
  limit: number;

  @IsInt()
  page: number;

  @IsOptional()
  @IsInt()
  minPrice?: number;

  @IsOptional()
  @IsInt()
  maxPrice?: number;

  @IsOptional()
  @IsString({ each: true })
  @IsAmenity({ message: 'Invalid amenity' })
  amenities?: string[];

  @IsOptional()
  @IsString({ each: true })
  @IsIn(['2', '3', '4', '5', 'unrated'], { each: true })
  ratings?: string[];
}
