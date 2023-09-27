import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { AmenityEntity } from './amenity.entity';
import { RegionEntity } from './../region/region.entity';
import { BookingEntity } from './../booking/booking.entity';
import { UserEntity } from '../user/user.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'hotels' })
export class HotelEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'address', length: 255, nullable: false })
  address: string;

  @Column({ type: 'float', name: 'rating', nullable: true })
  rating: number;

  @Column({ name: 'number_of_reviews', nullable: true })
  numberOfReviews: number;

  @Column({ name: 'daily_price', type: 'float', nullable: false })
  dailyPrice: number;

  @Column({ name: 'currency_code', nullable: false })
  currencyCode: string;

  @Column({ name: 'description', length: 2048, nullable: true })
  description: string;

  @Column('simple-array', { name: 'photos', nullable: false })
  photos: string[];

  @Column({ name: 'max_guests', nullable: true })
  maxGuests: number;

  @Column({ name: 'bathrooms', nullable: true })
  bathrooms: number;

  @ManyToOne(() => RegionEntity, (region) => region.hotels)
  @JoinColumn({ name: 'region_id' })
  region: RegionEntity;

  @ManyToMany(() => AmenityEntity, (amenity) => amenity.hotels)
  @JoinTable({
    name: 'hotel_amenities',
    joinColumn: { name: 'hotel_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'amenity_id', referencedColumnName: 'id' },
  })
  amenities: AmenityEntity[];

  @Exclude()
  @ManyToMany(() => UserEntity, (user) => user.favoriteHotels)
  favoritedByUsers: UserEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.hotel)
  bookings: BookingEntity[];
}
