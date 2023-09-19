import { IsArray, IsIn, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsDateStringFormat } from '../validation/is-date-string-format.validator';

export class SearchHotelsDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsNumberString()
  destination: string;

  @IsString()
  @IsDateStringFormat()
  checkIn: string;

  @IsString()
  @IsDateStringFormat()
  checkOut: string;

  @IsNumberString()
  guests: string;

  @IsOptional()
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
  @IsString()
  amenities?: string;

  @IsOptional()
  @IsString()
  ratings?: string;
}
