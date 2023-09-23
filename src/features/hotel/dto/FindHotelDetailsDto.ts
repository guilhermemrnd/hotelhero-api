import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

import { IsDateStringFormat } from '../validation/is-date-string-format.validator';

export class FindHotelDetailsDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsNumberString()
  hotelId: string;

  @IsString()
  @IsDateStringFormat()
  checkIn?: string;

  @IsString()
  @IsDateStringFormat()
  checkOut?: string;

  @IsNumberString()
  guests?: string;
}
