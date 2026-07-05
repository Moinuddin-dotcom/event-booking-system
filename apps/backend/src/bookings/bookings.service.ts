import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

import { PrismaService } from '../prisma/prisma.service';
import { QueueService } from '../queue/queue.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    const existingBooking = await this.prisma.booking.findUnique({
      where: {
        requestId: createBookingDto.requestId,
      },
    });

    if (existingBooking) {
      throw new ConflictException('Duplicate requestId');
    }

    const event = await this.prisma.event.findUnique({
      where: {
        id: createBookingDto.eventId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const booking = await this.prisma.booking.create({
      data: {
        bookingReference: randomUUID(),
        requestId: createBookingDto.requestId,
        eventId: createBookingDto.eventId,
        customerName: createBookingDto.customerName,
        customerEmail: createBookingDto.customerEmail,
        seats: createBookingDto.seats,
        status: BookingStatus.PENDING,
      },
    });

    await this.queueService.addBookingJob(booking.id);

    return {
      message: 'Booking accepted for processing.',
      bookingReference: booking.bookingReference,
      status: booking.status,
    };
  }
}