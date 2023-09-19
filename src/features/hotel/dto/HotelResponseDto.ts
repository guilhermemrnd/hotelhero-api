import { HotelEntity } from '../hotel.entity';

export class HotelResponseDto {
  data: EnrichedHotel[];
  total: number;
  page: number;
  limit: number;
}

interface EnrichedHotel extends HotelEntity {
  isFavorite: boolean;
}
