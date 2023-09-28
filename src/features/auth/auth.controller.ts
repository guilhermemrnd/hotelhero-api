import { Body, Controller, Post, Res, Get, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, CookieOptions } from 'express';
import 'dotenv/config'

import { LoginDto } from './dto/LoginDto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new NotFoundException('Invalid credentials');

    const jwt = await this.authService.generateJWT(user, body?.rememberMe);

    const isProduction = process.env.NODE_ENV === 'production';

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'none',
    };

    if (body?.rememberMe) {
      const expiryTime = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days
      cookieOptions['expires'] = expiryTime;
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
  async checkAuth(@Req() req) {
    try {
      const token = req.cookies['access_token'] || req.headers.authorization?.split(' ')[1];
      if (!token) return { authenticated: false, userId: null };

      const decoded = this.jwtService.verify(token);
      return { authenticated: true, userId: decoded['sub'] };
    } catch (e) {
      return { authenticated: false, userId: null };
    }
  }
}
