import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'Tech Conference 2026',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'A full-day conference about software engineering.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2026-12-20T10:00:00.000Z',
  })
  @IsDateString()
  date!: string;

  @ApiProperty({
    example: 100,
  })
  @IsInt()
  @Min(1)
  totalSeats!: number;

  @ApiProperty({
    example: 99.99,
  })
  @IsNumber()
  @IsPositive()
  price!: number;
}
