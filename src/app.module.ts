import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { BookingsModule } from './booking/bookings.module';

@Module({
  imports: [UsersModule, HotelsModule, BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
