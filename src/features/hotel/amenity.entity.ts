import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HotelEntity } from './hotel.entity';

@Entity('amenities')
export class AmenityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 50, unique: true })
  name: string;

  @ManyToMany(() => HotelEntity, (hotel) => hotel.amenities)
  hotels: HotelEntity[];
}
