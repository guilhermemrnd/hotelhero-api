import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  checkIn?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  checkOut?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  numberOfGuests?: number;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  totalCost?: number;
}
