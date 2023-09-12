export interface HotelPhotosResponse {
  url_prefix: string;
  data: {
    [key: string]: Array<{
      [index: number]: string;
    }>;
  };
}
