import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map } from 'rxjs';
import 'dotenv/config';

import { Currency, Language } from './language-curreny.enum';
import { LocationsResponse } from './interfaces/locations-response';
import { HotelsListResponse } from './interfaces/hotels-list-response';
import { SearchHotelsDto } from './../../features/hotel/dto/SearchHotelsDto';
import { CachingService } from '../caching.service';
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

    return this.httpService.get<LocationsResponse[]>(url, options).pipe(
      map((axiosResponse) => axiosResponse.data),
      catchError((error) => {
        const jsonError = JSON.stringify(error.response.data, null, 2);
        console.error(`Failed to fetch locations from RapidAPI. Error: ${jsonError}`);
        throw new InternalServerErrorException(`Failed to fetch locations from RapidAPI. ${error}`);
      }),
    );
  }

  public fetchHotels(query: SearchHotelsDto): Observable<HotelsListResponse> {
    const params = this.buildParamsToFetchHotels(query);
    const options = { params, headers: this.headers } as Object;
    const url = `${this.API}/properties/list`;
    const cacheKey = JSON.stringify({ url, params });

    return this.cacheAndFetch<HotelsListResponse>(cacheKey, url, options);

    // return this.httpService.get<HotelsListResponse>(url, options).pipe(
    //   map((axiosResponse) => axiosResponse.data),
    //   catchError((error) => {
    //     const jsonError = JSON.stringify(error.response.data, null, 2);
    //     console.error(`Failed to fetch hotels from RapidAPI. Error: ${jsonError}`);
    //     throw new InternalServerErrorException(`Failed to fetch hotels from RapidAPI. ${error}`);
    //   }),
    // );
  }

  private buildParamsToFetchHotels(query: SearchHotelsDto) {
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
      price_filter_currencycode: Currency.USD,
      order_by: 'popularity',
      languagecode: Language.en_US,
      travel_purpose: 'leisure',
    };
  }
}
