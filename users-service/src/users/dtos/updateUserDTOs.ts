import { User } from '@users/entities/user';

export interface UpdateUserInputDTO {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserOutputDTO {
  user: User;
}
