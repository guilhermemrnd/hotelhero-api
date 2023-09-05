import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from './../user/user.entity';
import { HotelEntity } from './../hotel/hotel.entity';

@Entity({ name: 'bookings' })
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  bookingId: string;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  user: UserEntity;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.bookings)
  hotel: HotelEntity;

  @Column({ name: 'check_in', nullable: false })
  checkIn: string;

  @Column({ name: 'check_out', nullable: false })
  checkOut: string;

  @Column({ name: 'number_of_guests', nullable: false })
  numberOfGuests: number;

  @Column({ name: 'total_cost', nullable: false })
  totalCost: number;

  @Column({ name: 'booking_status', nullable: false })
  bookingStatus: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
