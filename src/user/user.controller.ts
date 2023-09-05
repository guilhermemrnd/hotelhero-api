import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { uuid } from 'uuidv4';

import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { FindAllUsersDto } from './dto/FindAllUsersDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Get()
  public async findAllUsers(@Query() query: FindAllUsersDto) {
    return await this.userService.findAllUsers();
  }

  @Get('/:id')
  public async findUserById(@Param('id') id: string) {
    // return await this.userService.findUserById(id);
  }

  @Put('/:id')
  public async updatedUser(@Param('id') id: string, @Body() newData: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, newData);
    return { updatedUser, message: 'User updated successfully' };
  }

  @Post()
  public async createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity();

    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.id = uuid();

    const createdUser = await this.userService.createUser(userEntity);
    return { createdUser, message: 'User created successfully' };
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    return { deletedUser, message: 'User deleted successfully' };
  }
}
