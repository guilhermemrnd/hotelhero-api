import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/CreateUserDto';
import { FindAllUsersDto } from './dto/FindAllUsersDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
    const createdUser = await this.userService.createUser(userData);
    return { createdUser, message: 'User created successfully' };
  }

  @Delete('/:id')
  public async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.deleteUser(id);
    return { deletedUser, message: 'User deleted successfully' };
  }
}
