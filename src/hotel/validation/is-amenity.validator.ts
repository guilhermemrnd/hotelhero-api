import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { AmenityEntity } from '../amenity.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class AmenitiesValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(AmenityEntity)
    private readonly amenityRepository: Repository<AmenityEntity>,
  ) {}

  async validate(value: string[]): Promise<boolean> {
    const allowedAmenities = await this.amenityRepository.find();
    const amenitiesNames = allowedAmenities.map((amenity) => amenity.name);
    return value.every((amenity) => amenitiesNames.includes(amenity));
  }
}

export const IsAmenity = (validationOptions: ValidationOptions) => {
  return (object: object, property: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: AmenitiesValidator,
    });
  };
};
