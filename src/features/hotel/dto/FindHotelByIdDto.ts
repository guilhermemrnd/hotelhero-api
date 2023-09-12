import { IsNumberString, IsString } from 'class-validator';

export class FindHotelByIdDto {
  @IsNumberString()
  hotelId: string;

  @IsString()
  checkIn?: string;

  @IsString()
  checkOut?: string;

  @IsNumberString()
  guests?: string;
}
