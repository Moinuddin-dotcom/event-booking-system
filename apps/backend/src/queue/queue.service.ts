import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('booking-queue')
    private readonly bookingQueue: Queue,
  ) {}

  async addBookingJob(bookingId: number) {
    await this.bookingQueue.add(
      'process-booking',
      {
        bookingId,
      },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        removeOnComplete: 100,
        removeOnFail: 100,
      },
    );
  }
}