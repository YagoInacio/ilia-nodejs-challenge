import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty()
  @ApiProperty({
    example: 'John',
    description: `User's first name`,
  })
  first_name: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Wick',
    description: `User's last name`,
  })
  last_name: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    example: 'r%zIN8e8QhoW',
    description: `User's password`,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john_wick@continental.com',
    description: `User's email`,
  })
  email: string;
}
