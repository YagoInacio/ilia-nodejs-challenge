import { User } from '@users/entities/user';

export interface AuthUserInputDTO {
  email: string;
  password: string;
}

export interface AuthUserOutputDTO {
  user: User;
  accessToken: string;
}
