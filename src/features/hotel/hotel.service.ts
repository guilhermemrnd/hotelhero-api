import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { HotelEntity } from './hotel.entity';
import { RegionEntity } from '../region/region.entity';
import { AmenityEntity } from './amenity.entity';
import { BookingEntity } from './../booking/booking.entity';
import { CreateHotelDto } from './dto/CreateHotelDto';
import { SearchHotelsDto } from './dto/SearchHotelsDto';
import { UpdateHotelDto } from './dto/UpdateHotelDto';
import { RapidAPIService } from './../../common/rapid-api/rapid-api.service';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
    @InjectRepository(AmenityEntity)
    private readonly amenityRepository: Repository<AmenityEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly rapidAPIService: RapidAPIService,
  ) {}

  public async createHotel(hotelData: CreateHotelDto): Promise<HotelEntity> {
    const hotelEntity = await this.createHotelEntity(hotelData);
    return await this.hotelRepository.save(hotelEntity);
  }

  public async findHotels(query: SearchHotelsDto): Promise<HotelEntity[]> {
    const queryBuilder = this.buildQuery(query);

    const hotels = await queryBuilder?.getMany();

    if (hotels?.length === 0) {
      const apiData = await this.fetchFromRapidAPI(query);

      if (!apiData) return [];

      const region = await this.findRegionById(Number(query.search));

      const hotelEntities = apiData?.map((hotel) => {
        const photoUrl = hotel.main_photo_url.replace('square60', '1024x720');
        const normalizedRating = hotel.review_score / 2;

        return this.hotelRepository.create({
          id: hotel.hotel_id,
          name: hotel.hotel_name,
          address: hotel.address,
          rating: normalizedRating,
          numberOfReviews: hotel.review_nr,
          dailyPrice: hotel.min_total_price,
          currencyCode: hotel.currency_code,
          photos: [photoUrl],
          region,
        });
      });

      return await this.hotelRepository.save(hotelEntities);
    }

    return hotels ?? [];
  }

  public async findHotelById(id: number): Promise<HotelEntity> {
    const hotel = await this.hotelRepository.findOneBy({ id });

    if (!hotel) throw new NotFoundException('Hotel not found');

    return hotel;
  }

  public async findHotelBookings(hotelId: number): Promise<BookingEntity[]> {
    return await this.bookingRepository.find({ where: { hotel: { id: hotelId } } });
  }

  public async updateHotel(id: number, newData: UpdateHotelDto): Promise<HotelEntity> {
    const hotel = await this.findHotelById(id);

    if (newData?.amenities) {
      const foundAmenities = await this.findAmenitiesByName(newData.amenities);
      hotel.amenities = foundAmenities;
    }

    this.updateHotelProps(hotel, newData);

    return await this.hotelRepository.save(hotel);
  }

  // create-hotel helper methods
  private async createHotelEntity(hotel: CreateHotelDto): Promise<HotelEntity> {
    const regionEntity = await this.findRegionById(Number(hotel.region));
    const foundAmenities = await this.findAmenitiesByName(hotel.amenities);

    return this.hotelRepository.create({
      name: hotel.name,
      address: hotel.address,
      region: regionEntity,
      dailyPrice: hotel.dailyPrice,
      amenities: foundAmenities,
      maxGuests: hotel.maxGuests,
      photos: hotel.photos,
      description: hotel.description,
    });
  }

  private async findRegionById(id: number): Promise<RegionEntity> {
    const region = await this.regionRepository.findOneBy({ id });

    if (!region) throw new NotFoundException('Region not found');

    return region;
  }

  private async findAmenitiesByName(amenities: string[]): Promise<AmenityEntity[]> {
    const foundAmenities = await this.amenityRepository.findBy({ name: In(amenities) });

    if (foundAmenities.length !== amenities.length) {
      throw new BadRequestException('Some amenities could not be found');
    }

    return foundAmenities;
  }

  // find-hotels helper methods
  private buildQuery(query: SearchHotelsDto) {
    try {
      const { search, limit, page, minPrice, maxPrice, amenities, ratings } = query;

      const queryBuilder = this.hotelRepository
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.region', 'region')
        .leftJoinAndSelect('hotel.amenities', 'amenity')
        .where('hotel.region = :regionId', { regionId: +search });

      if (minPrice) {
        queryBuilder.andWhere('hotel.dailyPrice >= :minPrice', { minPrice });
      }

      if (maxPrice) {
        queryBuilder.andWhere('hotel.dailyPrice <= :maxPrice', { maxPrice });
      }

      if (amenities && amenities.length > 0) {
        queryBuilder.andWhere('hotel.amenites IN (:...amenities)', { amenities });
      }

      if (ratings && ratings.length > 0) {
        const ratingQueries = ratings.map((rating) => {
          if (rating === 'unrated') {
            return 'hotel.rating IS NULL';
          } else {
            return `hotel.rating >= ${+rating} AND hotel.rating < ${parseInt(rating) + 1}`;
          }
        });

        queryBuilder.andWhere(`(${ratingQueries.join(' OR ')})`);
      }

      queryBuilder.limit(+limit).offset((+page - 1) * +limit);

      return queryBuilder;
    } catch (e) {
      console.error('Error building query:', e);
    }
  }

  private async fetchFromRapidAPI(query: SearchHotelsDto) {
    const hotels = await firstValueFrom(this.rapidAPIService.fetchHotels(query));
    return hotels.result;
  }

  // update-hotel helper methods
  private updateHotelProps(hotel: HotelEntity, newData: UpdateHotelDto) {
    for (const [key, value] of Object.entries(newData)) {
      if (value !== undefined && key !== 'amenities') {
        if (key in hotel) {
          hotel[key] = value;
        } else {
          throw new Error(`Property '${key}' does not exist on type 'HotelEntity'.`);
        }
      }
    }
  }
}
