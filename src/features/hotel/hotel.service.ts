import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { HotelEntity } from './hotel.entity';
import { RegionEntity } from '../region/region.entity';
import { AmenityEntity } from './amenity.entity';
import { BookingEntity } from './../booking/booking.entity';
import { CreateHotelDto } from './dto/CreateHotelDto';
import { SearchHotelsDto } from './dto/SearchHotelsDto';
import { UpdateHotelDto } from './dto/UpdateHotelDto';

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
  ) {}

  public async createHotel(hotelData: CreateHotelDto): Promise<HotelEntity> {
    const hotelEntity = await this.createHotelEntity(hotelData);
    return await this.hotelRepository.save(hotelEntity);
  }

  public async findHotels(query: SearchHotelsDto): Promise<HotelEntity[]> {
    const { search, limit, page, minPrice, maxPrice, amenities, ratings } = query;

    const queryBuilder = this.hotelRepository
      .createQueryBuilder('hotel')
      .leftJoinAndSelect('hotel.amenities', 'amenity')
      .where('hotel.city LIKE :search', { search: `%${search}%` });

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

    queryBuilder.limit(limit).offset((page - 1) * limit);

    return queryBuilder.getMany();
  }

  public async findHotelById(id: string): Promise<HotelEntity> {
    const hotel = await this.hotelRepository.findOneBy({ id });

    if (!hotel) throw new NotFoundException('Hotel not found');

    return hotel;
  }

  public async findHotelBookings(hotelId: string): Promise<BookingEntity[]> {
    return await this.bookingRepository.find({ where: { hotel: { id: hotelId } } });
  }

  public async updateHotel(id: string, newData: UpdateHotelDto): Promise<HotelEntity> {
    const hotel = await this.findHotelById(id);

    if (newData?.amenities) {
      const foundAmenities = await this.findAmenitiesByName(newData.amenities);
      hotel.amenities = foundAmenities;
    }

    this.updateProperties(hotel, newData);

    return await this.hotelRepository.save(hotel);
  }

  private async createHotelEntity(hotel: CreateHotelDto): Promise<HotelEntity> {
    const foundAmenities = await this.findAmenitiesByName(hotel.amenities);
    const regionEntity = await this.findRegionById(Number(hotel.region));

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

  private async findAmenitiesByName(amenities: string[]): Promise<AmenityEntity[]> {
    const foundAmenities = await this.amenityRepository.findBy({ name: In(amenities) });

    if (foundAmenities.length !== amenities.length) {
      throw new BadRequestException('Some amenities could not be found');
    }

    return foundAmenities;
  }

  private updateProperties(hotel: HotelEntity, newData: UpdateHotelDto) {
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

  private async findRegionById(id: number): Promise<RegionEntity> {
    const region = await this.regionRepository.findOneBy({ id });

    if (!region) throw new NotFoundException('Region not found');

    return region;
  }
}
