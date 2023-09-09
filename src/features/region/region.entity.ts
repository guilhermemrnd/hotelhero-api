import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';

import { HotelEntity } from '../hotel/hotel.entity';

@Entity('regions')
export class RegionEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @OneToMany(() => HotelEntity, (hotel) => hotel.region)
  hotels: HotelEntity[];
}
