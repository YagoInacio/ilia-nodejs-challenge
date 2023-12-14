import { User as PrismaUser } from '@prisma/client';
import { Email } from '@users/entities/email';
import { User } from '@users/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.value,
      password: user.password,
      confirmed: user.confirmed,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        firstName: raw.firstName,
        lastName: raw.lastName,
        email: new Email(raw.email),
        password: raw.password,
        active: raw.active,
        confirmed: raw.confirmed,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
