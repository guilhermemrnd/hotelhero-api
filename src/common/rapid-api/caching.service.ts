import { HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map, tap, catchError, of } from 'rxjs';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

export abstract class CachingService {
  private cache = new Map<string, any>();
  private cacheFilePath = path.resolve(__dirname, 'cache.json');

  constructor(protected httpService: HttpService) {
    this.loadCacheFromFile();
  }

  private async loadCacheFromFile() {
    try {
      const data = await readFile(this.cacheFilePath, 'utf-8');
      this.cache = new Map(JSON.parse(data));
    } catch (e) {
      console.log('Could not load cache from file, starting with an empty cache');
    }
  }

  private async saveCacheToFile() {
    const data = JSON.stringify(Array.from(this.cache.entries()));
    await writeFile(this.cacheFilePath, data);
  }

  protected cacheAndFetch<T>(cacheKey: string, url: string, options?: any): Observable<T> {
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    return this.httpService.get<T>(url, options).pipe(
      map((response) => {
        const data = response.data;

        if (this.isAPIErrorResponse(data)) {
          const jsonError = JSON.stringify(data, null, 2);
          console.error('API Error:', jsonError)
          throw new Error();
        }

        return response.data;
      }),
      tap((data) => {
        this.cache.set(cacheKey, data);
        this.saveCacheToFile().catch((e) => {
          console.error('Could not save cache to file:', e);
        });
      }),
      catchError((error) => {
        this.cache.delete(cacheKey);
        console.error(`Error occurred while fetching ${url}.`, error);
        throw new Error(`Failed to fetch data. Code ${error.response?.status || 500}`);
      }),
    );
  }

  private isAPIErrorResponse(data: any): { code: string; message: string } {
    return data && typeof data === 'object' && 'code' in data && 'message' in data;
  }
}
