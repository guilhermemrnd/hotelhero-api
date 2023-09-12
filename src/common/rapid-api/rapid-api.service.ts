import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, firstValueFrom } from 'rxjs';
import 'dotenv/config';

import { Currency, Language } from './language-currency.enum';
import { LocationsResponse } from './interfaces/locations-response';
import { HotelsListResponse } from './interfaces/hotels-list-response';
import { HotelDetailResponse } from './interfaces/hotel-detail-response';
import { HotelPhotosResponse } from './interfaces/hotel-photos-response';
import { HotelDescriptionResponse } from './interfaces/hotel-description-response';
import { SearchHotelsDto } from './../../features/hotel/dto/SearchHotelsDto';
import { FindHotelByIdDto } from './../../features/hotel/dto/FindHotelByIdDto';
import { CachingService } from './caching.service';
import { formatDate } from './../moment-utils';

@Injectable()
export class RapidAPIService extends CachingService {
  readonly API = process.env.RAPIDAPI_URL as string;
  readonly headers = {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
  };

  constructor(protected httpService: HttpService) {
    super(httpService);
  }

  public fetchRegions(location: string): Observable<LocationsResponse[]> {
    const params = { text: location, languagecode: Language.en_US };
    const options = { params, headers: this.headers } as Object;
    const url = `${this.API}/locations/auto-complete`;
    const cacheKey = JSON.stringify({ url, params });
    return this.cacheAndFetch<LocationsResponse[]>(cacheKey, url, options);
  }

  public fetchHotels(query: SearchHotelsDto): Observable<HotelsListResponse> {
    const params = this.getParamsToFetchHotels(query);
    const options = { params, headers: this.headers } as Object;
    const url = `${this.API}/properties/list`;
    const cacheKey = JSON.stringify({ url, params });
    return this.cacheAndFetch<HotelsListResponse>(cacheKey, url, options);
  }

  public async fetchHotelById(query: FindHotelByIdDto) {
    const details = await firstValueFrom(this.fetchHotelDetails(query));
    const photos = await firstValueFrom(this.fetchHotelPhotos(query));
    const descriptions = await firstValueFrom(this.fetchHotelDescription(query));
    return { details, photos, descriptions };
  }

  private getParamsToFetchHotels(query: SearchHotelsDto) {
    return {
      offset: query.page,
      arrival_date: formatDate(query.checkIn, 'YYYY-MM-DD'),
      departure_date: formatDate(query.checkOut, 'YYYY-MM-DD'),
      guest_qty: query.guests,
      dest_ids: query.search,
      // room_qty: '1',
      // search_type: 'city',
      // children_age: '5,7',
      search_id: 'none',
      order_by: 'popularity',
      price_filter_currencycode: Currency.USD,
      languagecode: Language.en_US,
      travel_purpose: 'leisure',
    };
  }

  private fetchHotelDetails(query: FindHotelByIdDto): Observable<HotelDetailResponse[]> {
    const params = this.getParamsToFetchHotelDetails(query);
    const options = { params, headers: this.headers } as Object;
    const url = `${this.API}/properties/detail`;
    const cacheKey = JSON.stringify({ url, params });
    return this.cacheAndFetch<HotelDetailResponse[]>(cacheKey, url, options);
  }

  private getParamsToFetchHotelDetails(query: FindHotelByIdDto) {
    if (!query?.checkIn || !query?.checkOut) {
      throw new BadRequestException('Check-in and check-out dates are required');
    }

    return {
      hotel_id: query.hotelId,
      search_id: 'none',
      departure_date: formatDate(query.checkOut, 'YYYY-MM-DD'),
      arrival_date: formatDate(query.checkIn, 'YYYY-MM-DD'),
      rec_guest_qty: query.guests,
      rec_room_qty: '1',
      // dest_ids: '-3727579',
      // recommend_for: '3',
      languagecode: Language.en_US,
      currency_code: Currency.USD,
      units: 'metric',
    };
  }

  private fetchHotelPhotos(query: FindHotelByIdDto): Observable<HotelPhotosResponse> {
    const params = { hotel_ids: query.hotelId, languagecode: Language.en_US };
    const options = { params, headers: this.headers } as Object;
    const url = `${this.API}/properties/get-hotel-photos`;
    const cacheKey = JSON.stringify({ url, params });
    return this.cacheAndFetch<HotelPhotosResponse>(cacheKey, url, options);
  }

  private fetchHotelDescription(query: FindHotelByIdDto): Observable<HotelDescriptionResponse[]> {
    const params = { hotel_ids: query.hotelId, languagecode: Language.en_US };
    const options = { params, headers: this.headers } as Object;
    const url = `${this.API}/properties/get-description`;
    const cacheKey = JSON.stringify({ url, params });
    return this.cacheAndFetch<HotelDescriptionResponse[]>(cacheKey, url, options);
  }
}
