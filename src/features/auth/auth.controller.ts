import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: LoginDto) {
    const user = await this.authService.validateUser(req.email, req.password);

    if (!user) return { message: 'Invalid email or password' };

    return this.authService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Body('oldToken') oldToken: string) {
    return this.authService.refreshToken(oldToken);
  }
}
