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
import { UserEntity } from '../user/user.entity';
import { CreateHotelDto } from './dto/CreateHotelDto';
import { SearchHotelsDto } from './dto/SearchHotelsDto';
import { FindHotelByIdDto } from './dto/FindHotelByIdDto';
import { UpdateHotelDto } from './dto/UpdateHotelDto';
import { EnrichedHotel, HotelResponseDto } from './dto/HotelResponseDto';
import { HotelPhotosResponse } from './../../common/rapid-api/interfaces/hotel-photos-response';
import { RapidAPIService } from './../../common/rapid-api/rapid-api.service';
import { HotelDetailResponse } from 'src/common/rapid-api/interfaces/hotel-detail-response';

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
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly rapidAPIService: RapidAPIService,
  ) {}

  public async createHotel(hotelData: CreateHotelDto): Promise<HotelEntity> {
    const hotelEntity = await this.createHotelEntity(hotelData);
    return await this.hotelRepository.save(hotelEntity);
  }

  public async findHotels(query: SearchHotelsDto): Promise<HotelResponseDto> {
    try {
      const queryBuilder = this.buildQuery(query);

      let [hotels, total] = await queryBuilder.getManyAndCount();

      if (hotels.length === 0) {
        const hotelEntities = await this.createHotelsFromAPI(query);
        hotels = await this.hotelRepository.save(hotelEntities);
      }

      if (query.userId) {
        hotels = await this.addIsFavoriteProp(query.userId, hotels);
      }

      return { data: hotels, total, page: +query.page, limit: +query.limit };
    } catch (e) {
      console.error('Error finding hotels.', e);
      throw new InternalServerErrorException('Error finding hotels');
    }
  }

  public async findHotelById(query: FindHotelByIdDto): Promise<EnrichedHotel> {
    const hotel = await this.hotelRepository.findOne({
      where: { id: +query.hotelId },
      relations: ['amenities', 'bookings'],
    });

    if (!hotel) throw new NotFoundException('Hotel not found');

    if (this.needsUpdate(hotel) && query) {
      const updatedHotel = await this.updateHotelInfo(hotel, query);
      return await this.hotelRepository.save(updatedHotel);
    }

    if (query.userId) {
      const favoriteHotelsIds = await this.getFavoriteHotelIds(query.userId);
      return { ...hotel, isFavorite: favoriteHotelsIds.includes(hotel.id) };
    }

    return hotel;
  }

  public async findHotelBookings(hotelId: number): Promise<BookingEntity[]> {
    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });
    if (!hotel) throw new NotFoundException('Hotel not found');

    const hotelBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.hotel', 'hotel')
      .where('hotel.id = :hotelId', { hotelId })
      .getMany();

    return hotelBookings;
  }

  public async updateHotel(id: string, newData: UpdateHotelDto): Promise<HotelEntity> {
    const hotel = await this.findHotelById({ hotelId: id });

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
      const { userId, destination, minPrice, maxPrice, amenities, ratings } = query;

      const limit = Number(query.limit);
      const page = Number(query.page);

      const queryBuilder = this.hotelRepository
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.region', 'region')
        .leftJoinAndSelect('hotel.bookings', 'booking')
        .where('hotel.region = :regionId', {
          regionId: +destination,
        });

      if (userId) {
        queryBuilder
          .leftJoinAndSelect('hotel.favoritedByUsers', 'user', 'user.id = :userId', { userId })
          .addSelect('CASE WHEN user.id IS NOT NULL THEN TRUE ELSE FALSE END', 'isFavorite');
      }

      if (minPrice) {
        queryBuilder.andWhere('hotel.dailyPrice >= :minPrice', { minPrice });
      }

      if (maxPrice) {
        queryBuilder.andWhere('hotel.dailyPrice <= :maxPrice', { maxPrice });
      }

      if (amenities && amenities.length > 0) {
        const amenitiesArray = amenities.split(',');
        queryBuilder
          .leftJoinAndSelect('hotel.amenities', 'amenity')
          .andWhere('hotel.amenities IN (:...amenitiesArray)', { amenitiesArray });
      }

      if (ratings && ratings.length > 0) {
        this.buildRatingsQuery(queryBuilder, ratings);
      }

      queryBuilder.limit(limit).offset((page - 1) * limit);

      return queryBuilder;
    } catch (e) {
      console.error('Error building query:', e);
      throw new InternalServerErrorException('Error building query', e.toString());
    }
  }

  private buildRatingsQuery(queryBuilder: any, ratings: string) {
    const ratingsArray = ratings.split(',');

    const conditions: string[] = [];
    const parameters = {};

    ratingsArray.forEach((rating, index) => {
      const paramName = `rate${index}`;
      let condition: string;

      switch (rating) {
        case 'twoStars':
          condition = 'hotel.rating >= 2 AND hotel.rating < 3';
          break;
        case 'threeStars':
          condition = 'hotel.rating >= 3 AND hotel.rating < 4';
          break;
        case 'fourStars':
          condition = 'hotel.rating >= 4 AND hotel.rating < 5';
          break;
        case 'fiveStars':
          condition = 'hotel.rating = 5';
          break;
        case 'unrated':
          condition = 'hotel.rating IS NULL';
          break;
        default:
          throw new BadRequestException('Invalid rating');
      }

      conditions.push(condition);
      parameters[paramName] = rating;
    });

    if (conditions.length > 0) {
      queryBuilder.where(`(${conditions.join(') OR (')})`, parameters);
    }
  }

  private async createHotelsFromAPI(query: SearchHotelsDto): Promise<HotelEntity[]> {
    const apiData = await firstValueFrom(this.rapidAPIService.fetchHotels(query));

    if (!apiData) return [];

    const region = await this.findRegionById(Number(query.destination));

    const hotelEntities = apiData?.result?.map((hotel) => {
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

    return hotelEntities;
  }

  private async getFavoriteHotelIds(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteHotels'],
    });
    return user?.favoriteHotels.map((hotel) => hotel.id) ?? [];
  }

  private async addIsFavoriteProp(userId: string, hotels: HotelEntity[]): Promise<EnrichedHotel[]> {
    const favoriteHotelsIds = await this.getFavoriteHotelIds(userId);
    return hotels.map((hotel) => ({ ...hotel, isFavorite: favoriteHotelsIds.includes(hotel.id) }));
  }

  // find-hotel-by-id helper methods
  private needsUpdate(hotel: HotelEntity): boolean {
    return hotel?.amenities.length === 1 || hotel?.photos.length === 1 || !hotel?.description;
  }

  private async updateHotelInfo(hotel: HotelEntity, query: FindHotelByIdDto): Promise<HotelEntity> {
    const apiData = await this.fetchDataFromRapidAPI(query);

    if (!apiData) return hotel;

    const { details, photosUrl, mainDescription } = apiData;

    const allAmenities = await this.resolveAmenities(details);

    return this.hotelRepository.create({
      ...hotel,
      description: mainDescription[0]?.description,
      maxGuests: details.block?.[0]?.nr_adults,
      bathrooms: details.block?.[0]?.number_of_bathrooms,
      photos: photosUrl,
      amenities: allAmenities,
    });
  }

  private async fetchDataFromRapidAPI(query: FindHotelByIdDto) {
    const { details, photos, descriptions } = await this.rapidAPIService.fetchHotelById(query);

    const photosUrl = this.getPhotosUrl(photos, query.hotelId);
    const mainDescription = descriptions.filter((d) => d.descriptiontype_id === 6);

    return { details: details?.[0], photosUrl, mainDescription };
  }

  private getPhotosUrl(photos: HotelPhotosResponse, hotelId: string): string[] {
    const max1024x768Urls: string[] = [];
    const urlPrefix = photos.url_prefix;

    const hotelPhotos = photos.data[hotelId];

    for (const photoSet of hotelPhotos) {
      for (let i = 4; i < photoSet.length; i++) {
        const potencialUrl = photoSet[i];
        if (typeof potencialUrl === 'string' && potencialUrl.includes('1024x768')) {
          max1024x768Urls.push(urlPrefix + potencialUrl);
        }
      }
    }

    return max1024x768Urls;
  }

  private async resolveAmenities(details: HotelDetailResponse) {
    const amenityNames = details.property_highlight_strip?.map((a) => a.name) ?? [];

    const existingAmenities = await this.amenityRepository.findBy({ name: In(amenityNames) });
    const existingAmenityNames = existingAmenities.map((a) => a.name);

    const newAmenities = amenityNames
      .filter((name) => !existingAmenityNames.includes(name))
      .map((name) => ({ name }));

    if (newAmenities.length > 0) {
      await this.amenityRepository.save(newAmenities);
    }

    const allAmenities = await this.amenityRepository.findBy({ name: In(amenityNames) });
    return allAmenities;
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
