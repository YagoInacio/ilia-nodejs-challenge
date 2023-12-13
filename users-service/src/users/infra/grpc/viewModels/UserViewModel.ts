import { User } from '@users/entities/user';

export class UserViewModel {
  static toGRPC(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      confirmed: user.confirmed,
    };
  }
}
