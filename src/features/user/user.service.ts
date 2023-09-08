import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { BookingEntity } from './../booking/booking.entity';
import { UserResponseDto } from './dto/UserResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const userEntity = new UserEntity();

    Object.assign(userEntity, userData as UserEntity);

    return await this.userRepository.save(userEntity);
  }

  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userRepository.find().then((res) => {
      return res.map((user) => new UserResponseDto(user.id, user.name, user.email));
    });
  }

  public async findUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto(user.id, user.name, user.email);
  }

  public async findUserBookings(userId: string): Promise<BookingEntity[]> {
    const user = await this.findUserById(userId);

    return await this.bookingRepository.find({ where: { user: { id: userId } } });
  }

  public async updateUser(id: string, newData: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findUserById(id);

    Object.assign(user, newData as UserEntity);

    return await this.userRepository.save(user);
  }

  public async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (!result.affected) throw new NotFoundException('User not found');
  }
}
