import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from './../user/user.entity';
import { HotelEntity } from './../hotel/hotel.entity';

@Entity({ name: 'bookings' })
export class BookingEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => HotelEntity, (hotel) => hotel.bookings)
  @JoinColumn({ name: 'hotel_id' })
  hotel: HotelEntity;

  @Column({ name: 'check_in', nullable: false })
  checkIn: string;

  @Column({ name: 'check_out', nullable: false })
  checkOut: string;

  @Column({ name: 'number_of_guests', nullable: false })
  numberOfGuests: number;

  @Column({ name: 'total_cost', nullable: false })
  totalCost: number;

  @Column({ name: 'is_paid', default: false })
  isPaid: boolean;

  @Column({ name: 'payment_id', nullable: true })
  paymentId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
