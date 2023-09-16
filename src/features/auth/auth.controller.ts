import { BadRequestException, Body, Controller, Post, Res, Get, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new BadRequestException('Invalid credentials');

    const jwt = await this.authService.generateJWT(user);

    const cookieOptions = { httpOnly: true };
    if (body?.rememberMe) {
      cookieOptions['expires'] = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    }

    res.cookie('access_token', jwt, cookieOptions);
    return res.send({ message: 'Logged in successfully' });
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.send({ message: 'Logged out successfully' });
  }

  @Get('check')
  @UseGuards(JwtAuthGuard)
  async checkAuth(@Req() req) {
    return { authenticated: true, user: req.user };
  }
}
