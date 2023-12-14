import { ApiProperty } from '@nestjs/swagger';
import { User } from '@users/entities/user';
import { UserViewModel, UserViewModelSchema } from './UserViewModel';

export class AuthUserViewModelSchema {
  @ApiProperty()
  user: UserViewModelSchema;
  @ApiProperty()
  access_token: string;
}

export class AuthUserViewModel {
  static toHTTP(user: User, accessToken: string): AuthUserViewModelSchema {
    return {
      user: UserViewModel.toHTTP(user),
      access_token: accessToken,
    };
  }
}
