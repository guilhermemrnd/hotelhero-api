import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BookingEntity } from './../booking/booking.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { FindAllUsersDto } from './dto/FindAllUsersDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserResponseDto } from './dto/UserResponseDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    const createdUser = await this.userService.createUser(user);
    return { data: createdUser, message: 'User created successfully' };
  }

  @Post('check-email')
  async checkEmail(@Body('email') email: string): Promise<{ exists: boolean }> {
    const exists = await this.userService.checkEmail(email);
    return { exists };
  }

  @Get()
  async findAllUsers(@Query() query: FindAllUsersDto): Promise<UserResponseDto[]> {
    return await this.userService.findAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findUserById(id);
  }

  @Get(':id/bookings')
  @UseGuards(JwtAuthGuard)
  async findUserBookings(@Param('id') userId: string): Promise<BookingEntity[]> {
    return await this.userService.findUserBookings(userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatedUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(id, user);
    return { data: updatedUser, message: 'User updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
