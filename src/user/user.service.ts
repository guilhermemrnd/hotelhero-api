import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import { UserEntity } from './user.entity';
import { UserResponseDto } from './dto/UserResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  public async createUser(userData: CreateUserDto): Promise<void> {
    const userEntity = new UserEntity();

    userEntity.id = uuid();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    await this.userRepository.save(userEntity);
  }

  public async findAllUsers(): Promise<UserResponseDto[]> {
    return await this.userRepository.find().then((res) => {
      return res.map((user) => new UserResponseDto(user.id, user.name, user.email));
    });
  }

  //   public async findUserById(id: string): Promise<UserResponseDto> {
  //     return await this.userRepository.findOne(id).then((res) => {
  //       return { id: res.id, name: res.name, email: res.email };
  //     });
  //   }

  public async updateUser(id: string, newData: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, newData);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
