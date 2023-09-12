export interface HotelPhotosResponse {
  url_prefix: string;
  data: {
    [hotelId: string]: Array<(number | any[] | Object[] | string)[]>;
  };
}
