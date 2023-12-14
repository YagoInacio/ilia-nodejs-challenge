import { User } from '@users/entities/user';

export interface CreateUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface CreateUserOutputDTO {
  user: User;
}
