import { IsOptional } from 'class-validator';

import { CreateBookingDto } from './CreateBookingDto';

export class UpdateBookingDto extends CreateBookingDto {
  @IsOptional()
  userId: string;

  @IsOptional()
  hotelId: string;

  @IsOptional()
  checkIn: string;

  @IsOptional()
  checkOut: string;

  @IsOptional()
  numberOfGuests: number;

  @IsOptional()
  totalCost: number;

  @IsOptional()
  bookingStatus: string;
}
