import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  hotelId: string;

  @IsString()
  @IsNotEmpty()
  checkIn: string;

  @IsString()
  @IsNotEmpty()
  checkOut: string;

  @IsInt()
  @IsNotEmpty()
  numberOfGuests: number;

  @IsInt()
  @IsNotEmpty()
  totalCost: number;

  @IsString()
  @IsNotEmpty()
  bookingStatus: string;
}
