import { HotelEntity } from "../hotel.entity";

export class HotelResponseDto {
  data: HotelEntity[];
  total: number;
  page: number;
  limit: number;
}
