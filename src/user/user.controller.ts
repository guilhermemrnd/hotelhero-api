import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { CreateUserDto } from './dto/CreateUserDto';
import { FindAllUsersDto } from './dto/FindAllUsersDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const createdUser = await this.userService.createUser(userData);
    return { createdUser, message: 'User created successfully' };
  }

  @Get()
  async findAllUsers(@Query() query: FindAllUsersDto) {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Get(':id/bookings')
  async findUserBookings(@Param('id') userId: string) {
    return await this.userService.findUserBookings(userId);
  }

  @Put(':id')
  async updatedUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    await this.userService.updateUser(id, user);
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
