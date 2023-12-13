import { PrismaService } from '@infra/database/prisma/prisma.service';
import { User } from '@users/entities/user';
import { UsersRepository } from '@users/repositories/usersRepository';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async listAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(PrismaUserMapper.toDomain);
  }

  async create(user: User): Promise<void> {
    const mapped = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: mapped,
    });
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);
    const { id, ...data } = raw;

    await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async confirm(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deactivate(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
