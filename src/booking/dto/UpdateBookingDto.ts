import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  hotelId: string;

  @IsOptional()
  @IsString()
  checkIn: string;

  @IsOptional()
  @IsString()
  checkOut: string;

  @IsOptional()
  @IsInt()
  numberOfGuests: number;

  @IsOptional()
  @IsInt()
  totalCost: number;

  @IsOptional()
  @IsString()
  bookingStatus: string;
}
