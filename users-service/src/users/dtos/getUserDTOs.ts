import { User } from '@users/entities/user';

export interface GetUserInputDTO {
  id: string;
}

export interface GetUserOutputDTO {
  user: User;
}
