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
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result as UserEntity;
    }
    return null;
  }

  public async generateJWT(user: UserEntity, rememberMe: boolean) {
    const payload = { email: user.email, sub: user.id };
    const expiresIn = rememberMe ? '7d' : '1d';
    return this.jwtService.sign(payload, { expiresIn });
  }
}
