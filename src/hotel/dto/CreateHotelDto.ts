import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateHotelDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  region: string;

  @IsNotEmpty()
  @IsInt()
  dailyPrice: number;

  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: false, message: 'At least 3 amenities must be selected' })
  @IsNotEmpty({ message: 'Amenities should not be empty' })
  amenities: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(50, { message: 'Description must be at least 50 characters long' })
  @MaxLength(750, { message: 'Description must be at most 750 characters long' })
  description: string;

  @ArrayNotEmpty()
  photos: string[];

  @IsNotEmpty()
  @IsInt()
  maxGuests: number;
}
