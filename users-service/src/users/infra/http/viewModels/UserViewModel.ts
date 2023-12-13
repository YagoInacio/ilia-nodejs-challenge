import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user';

export class UserViewModelSchema {
  @ApiProperty()
  id: string;
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  email: string;
}

export class UserViewModel {
  static toHTTP(user: User): UserViewModelSchema {
    return {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email.value,
    };
  }
}
