import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UsersRepository } from '@users/repositories/usersRepository';
import { PrismaUsersRepository } from '@users/infra/database/prisma/repositories/PrismaUsersRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
