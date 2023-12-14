import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class UserCredentials {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'john_wick@continental.com',
    description: `User's email`,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'r%zIN8e8QhoW',
    description: `User's password`,
  })
  password: string;
}

export class AuthUserBody {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => UserCredentials)
  @ApiProperty()
  user: UserCredentials;
}
