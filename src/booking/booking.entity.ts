import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bookings' })
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'hotel_id' })
  hotelId: number;

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
}
