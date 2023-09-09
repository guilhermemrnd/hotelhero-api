import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, map } from 'rxjs';
import 'dotenv/config';

import { RegionsResponse } from './regions-response';
import { Domain, Locale } from './domain-locale.enum';

@Injectable()
export class RapidAPIService {
  readonly API = process.env.RAPIDAPI_URL as string;
  readonly headers = {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.RAPIDAPI_HOST,
  };

  constructor(private httpService: HttpService) {}

  public fetchRegions(location: string): Observable<RegionsResponse> {
    const params = { domain: Domain.US, query: location, locale: Locale.en_US };
    const options = { params, headers: this.headers } as Object;

    return this.httpService.get<RegionsResponse>(`${this.API}/regions`, options).pipe(
      map((axiosResponse) => axiosResponse.data),
      catchError((error) => {
        const jsonError = JSON.stringify(error.response.data, null, 2);
        console.error(`Failed to fetch regions from RapidAPI. Error: ${jsonError}`);
        throw new InternalServerErrorException(`Failed to fetch regions from RapidAPI. ${error}`);
      }),
    );
  }
}
