import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserResponseDto } from './dto/UserResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { BookingEntity } from 'src/booking/booking.entity';

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

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    return await this.userRepository.save(userEntity);
  }

  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userRepository.find().then((res) => {
      return res.map((user) => new UserResponseDto(user.id, user.name, user.email));
    });
  }

  public async findUserById(id: string): Promise<UserResponseDto> {
    return await this.userRepository.findOneBy({ id }).then((res) => {
      return { id: res.id, name: res.name, email: res.email };
    });
  }

  public async findUserBookings(userId: string): Promise<BookingEntity[]> {
    return await this.bookingRepository.find({ where: { user: { id: userId } } });
  }

  public async updateUser(id: string, user: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, user);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
