import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus } from '@prisma/client';
import { CreateBookingDto } from './dto/create-booking.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    const existingBooking = await this.prisma.booking.findUnique({
      where: {
        requestId: createBookingDto.requestId,
      },
    });

    if (existingBooking) {
      throw new ConflictException('Duplicate requestId');
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

    return {
      message: 'Booking accepted for processing.',
      bookingReference: booking.bookingReference,
      status: booking.status,
    };
  }
}