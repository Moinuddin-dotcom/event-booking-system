import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Get, Query } from '@nestjs/common';
import { GetBookingsDto } from './dto/get-bookings.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Submit a booking request',
  })
  @ApiResponse({
    status: 202,
    description: 'Booking accepted for processing',
  })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get()
  findAll(@Query() query: GetBookingsDto) {
     return this.bookingsService.findAll(query);
}
}