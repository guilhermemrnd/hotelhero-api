import { Controller, Get } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  constructor(private userRepository: UserRepository) {}
}
