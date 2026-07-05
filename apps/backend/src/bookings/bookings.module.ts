import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [PrismaModule, QueueModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}