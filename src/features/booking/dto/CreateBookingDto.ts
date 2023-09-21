import { IsInt, IsNotEmpty, IsNumberString, IsString, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumberString()
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
}
