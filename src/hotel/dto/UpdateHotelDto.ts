import { IsOptional } from 'class-validator';
import { CreateHotelDto } from './CreateHotelDto';

export class UpdateHotelDto extends CreateHotelDto {
  @IsOptional()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  city: string;

  @IsOptional()
  dailyPrice: number;

  @IsOptional()
  amenities: string[];

  @IsOptional()
  description: string;

  @IsOptional()
  photos: string[];

  @IsOptional()
  maxGuests: number;
}
