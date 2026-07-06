import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { PrismaModule } from '../prisma/prisma.module';
import { QueueService } from './queue.service';
import { BookingProcessor } from './booking.processor/booking.processor';

@Module({
  imports: [
    PrismaModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'booking-queue',
    }),
  ],
  providers: [QueueService, BookingProcessor],
  exports: [QueueService],
})
export class QueueModule {}