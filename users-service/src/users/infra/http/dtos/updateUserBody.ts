import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserBody {
  @IsOptional()
  @ApiProperty({
    example: 'John',
    description: `User's first name`,
    required: false,
  })
  first_name?: string;

  @IsOptional()
  @ApiProperty({
    example: 'Wick',
    description: `User's last name`,
    required: false,
  })
  last_name?: string;

  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'r%zIN8e8QhoW',
    description: `User's password`,
    required: false,
  })
  password?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example: 'john_wick@continental.com',
    description: `User's email`,
    required: false,
  })
  email?: string;
}
