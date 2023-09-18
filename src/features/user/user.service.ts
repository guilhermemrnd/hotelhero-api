import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from './user.entity';
import { HotelEntity } from '../hotel/hotel.entity';
import { BookingEntity } from './../booking/booking.entity';
import { UserResponseDto } from './dto/UserResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(HotelEntity)
    private readonly hotelRepository: Repository<HotelEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    await this.checkIfUserExists(userData.email);

    const userEntity = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: bcrypt.hashSync(userData.password, 8),
    });

    return await this.userRepository.save(userEntity);
  }

  public async checkEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user;
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
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');

    const userBookings = await this.bookingRepository
      .createQueryBuilder('booking')
      .innerJoin('booking.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    return userBookings;
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

  public async toggleFavorite(userId: string, hotelId: number, isFavorite: boolean) {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['favoriteHotels'] });
    const hotel = await this.hotelRepository.findOneBy({ id: hotelId });

    if (!user || !hotel) {
      throw new NotFoundException('User or hotel not found');
    }

    if (isFavorite) {
      if (!user?.favoriteHotels.some((favHotel) => favHotel.id === hotel.id)) {
        user.favoriteHotels.push(hotel);
      }
    } else {
      user.favoriteHotels = user.favoriteHotels.filter((favHotel) => favHotel.id !== hotel.id);
    }

    await this.userRepository.save(user);
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new ConflictException('User already exists');
  }
}
