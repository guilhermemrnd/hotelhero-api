import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { UserResponseDto } from './dto/UserResponseDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

  public async createUser(userEntity: UserEntity) {
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
