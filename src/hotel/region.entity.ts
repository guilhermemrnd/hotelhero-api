import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { HotelEntity } from './hotel.entity';

@Entity('regions')
export class RegionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @OneToMany(() => HotelEntity, (hotel) => hotel.region)
  hotels: HotelEntity[];
}
