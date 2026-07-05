import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    example: '7f3c2a10-9b1e-4d5a-8c6f-123456789abc',
    description: 'Client-generated unique request ID',
  })
  @IsUUID()
  requestId!: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(1)
  eventId!: number;

  @ApiProperty({
    example: 'Rahim Uddin',
  })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({
    example: 'rahim@example.com',
  })
  @IsEmail()
  customerEmail!: string;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @Min(1)
  seats!: number;
}