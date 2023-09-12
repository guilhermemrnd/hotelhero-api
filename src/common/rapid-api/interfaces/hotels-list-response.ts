export interface HotelsListResponse {
  result: Array<{
    address: string; // "Av. Julio marques luz, 221"
    zip: string; // "57035-370"
    review_nr: number; // 2310
    review_score: number; // 9.2
    hotel_name: string; // "Porto Kaeté Hotel"
    main_photo_url: string;
    min_total_price: number; // 257.04
    price_breakdown: {
      currency: string; // "BRL"
      gross_price: number; // 514.08
    };
    checkin: {
      until: string; // "15:00"
      from: string; // ""
    };
    checkout: {
      until: string; // "12:00"
      from: string; //
    };
    currency_code: string; // "BRL"
    latitude: number; // -9.65348757583738
    longitude: number; // -35.7009261846542
    hotel_id: number; // 2616717
    accommodation_type_name: string; // "Hotels"
  }>;
}
