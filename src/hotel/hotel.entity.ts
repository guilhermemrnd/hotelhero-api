import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookingEntity } from './../booking/booking.entity';

@Entity({ name: 'hotels' })
export class HotelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'location', length: 255, nullable: false })
  location: string;

  @Column({ name: 'city', length: 100, nullable: false })
  city: string;

  @Column({ name: 'rating' })
  rating: number;

  @Column({ name: 'numberOfReviews' })
  numberOfReviews: number;

  @Column({ name: 'price', nullable: false })
  dailyPrice: string;

  @Column('simple-array', { name: 'amenities', nullable: false })
  amenities: string[];

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column('simple-array', { name: 'photos', nullable: false })
  photos: string[];

  @Column({ name: 'maxGuests', nullable: false })
  maxGuests: number;

  @OneToMany(() => BookingEntity, (booking) => booking.hotel)
  bookings: BookingEntity[];
}
