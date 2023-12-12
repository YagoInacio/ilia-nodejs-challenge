import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';
import { PrismaTransactionsRepository } from '@transactions/infra/database/prisma/repositories/PrismaTransactionsRepository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository,
    },
  ],
  exports: [PrismaService, TransactionsRepository],
})
export class DatabaseModule {}
