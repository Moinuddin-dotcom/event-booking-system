import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { PrismaService } from '../../prisma/prisma.service';

@Processor('booking-queue')
export class BookingProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

async process(job: Job) {
  const booking = await this.prisma.booking.findUnique({
    where: {
      id: job.data.bookingId,
    },
  });

  if (!booking) {
    return;
  }

  await this.prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: {
        id: booking.eventId,
      },
    });

    if (!event) {
      await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: 'FAILED',
          failureReason: 'Event not found',
        },
      });

      return;
    }

    if (event.remainingSeats < booking.seats) {
      await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: 'FAILED',
          failureReason: 'Not enough seats available',
        },
      });

      return;
    }

    await tx.event.update({
      where: {
        id: event.id,
      },
      data: {
        remainingSeats: {
          decrement: booking.seats,
        },
      },
    });

    await tx.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: 'CONFIRMED',
      },
    });
  });
}

  
}