import { HotelEntity } from '../hotel.entity';

export class HotelResponseDto {
  data: EnrichedHotel[];
  total: number;
  page: number;
  limit: number;
}

export interface EnrichedHotel extends HotelEntity {
  isFavorite?: boolean;
}
