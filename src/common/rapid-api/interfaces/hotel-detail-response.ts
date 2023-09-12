export interface HotelDetailResponse {
  block: Array<{
    product_price_breakdown: {
      gross_amount_per_night: {
        currency: string; // "USD"
        value: number; // 65.55
      };
      net_amount: {
        currency: string; // "USD"
        value: number; // 126.07
      };
    };
    nr_adults: number; // 2
    nr_children: number; // 0
    number_of_bathrooms: number; // 1
  }>;
  top_ufi_benefits: Array<{
    translated_name: string; // "Parking"
    icon: string; // "parking_sign"
  }>;
  property_highlight_strip: Array<{
    name: string; // "Swimming pool"
  }>;
  facilities_block: {
    facilities: Array<{
      name: string; // "1 swimming pool"
      icon: string; // "pool"
    }>;
  };
}
