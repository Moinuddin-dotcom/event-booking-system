import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new event',
  })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
  })
  create(@Body() dto: CreateEventDto) {
    return this.eventsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all events',
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get event by id',
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.eventsService.findOne(id);
  }
}