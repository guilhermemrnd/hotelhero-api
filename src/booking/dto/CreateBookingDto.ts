import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
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
