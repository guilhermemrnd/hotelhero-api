import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RegionEntity } from './region.entity';
import { AmenityEntity } from './amenity.entity';
import { BookingEntity } from './../booking/booking.entity';

@Entity({ name: 'hotels' })
export class HotelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'address', length: 255, nullable: false })
  address: string;

  @Column({ name: 'rating' })
  rating: number;

  @Column({ name: 'numberOfReviews' })
  numberOfReviews: number;

  @Column({ name: 'dailyPrice', nullable: false })
  dailyPrice: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column('simple-array', { name: 'photos', nullable: false })
  photos: string[];

  @Column({ name: 'maxGuests', nullable: false })
  maxGuests: number;

  @ManyToOne(() => RegionEntity, (region) => region.hotels)
  region: RegionEntity;

  @ManyToMany(() => AmenityEntity)
  @JoinTable()
  amenities: AmenityEntity[];

  @OneToMany(() => BookingEntity, (booking) => booking.hotel)
  bookings: BookingEntity[];
}
