import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigService } from './config/postgres.config.service';
import { UserModule } from './user/user.module';
import { HotelModule } from './hotel/hotel.module';
import { BookingModule } from './booking/booking.module';
import { GlobalFilterException } from './intercept/global-filter-exception';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UserModule,
    HotelModule,
    BookingModule,
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
