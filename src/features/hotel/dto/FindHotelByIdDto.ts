import { IsNumberString, IsString } from 'class-validator';

import { IsDateStringFormat } from '../validation/is-date-string-format.validator';

export class FindHotelByIdDto {
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
