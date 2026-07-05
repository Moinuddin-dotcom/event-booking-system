import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { QueueService } from './queue.service';

@Module({
  imports: [
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
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}