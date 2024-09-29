import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormConfig from './config/typeorm.config';
import { GlobalFilterException } from './common/global-filter-exception';

import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { HotelModule } from './features/hotel/hotel.module';
import { BookingModule } from './features/booking/booking.module';
import { RegionModule } from './features/region/region.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: ormConfig,
      inject: [ConfigService],
    }),
    UserModule,
    HotelModule,
    BookingModule,
    RegionModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalFilterException,
    },
  ],
})
export class AppModule {}
