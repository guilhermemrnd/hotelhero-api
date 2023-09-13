import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result as UserEntity;
    }
    return null;
  }

  public async login(user: UserEntity) {
    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
