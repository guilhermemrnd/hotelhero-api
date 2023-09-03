import { Controller, Get } from '@nestjs/common';

import { UsersRepository } from './users.repository';

@Controller('users')
export class UsersController {
  constructor(private usersRepository: UsersRepository) {}
}
