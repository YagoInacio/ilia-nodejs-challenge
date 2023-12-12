import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';
import { Injectable } from '@nestjs/common';
import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { PrismaTransactionMapper } from '../mappers/PrismaTransactionMapper';

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async listAll(filters: {
    userId?: string;
    type?: TransactionType;
  }): Promise<Transaction[]> {
    const where = {};

    if (filters.userId) {
      Object.assign(where, { userId: filters.userId });
    }
    if (filters.type) {
      Object.assign(where, { type: filters.type });
    }

    const transactions = await this.prisma.transaction.findMany({
      where,
    });

    return transactions.map(PrismaTransactionMapper.toDomain);
  }

  async getBalance(userId?: string): Promise<number> {
    const query = userId
      ? this.prisma.$queryRaw`
        SELECT SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE -amount END) AS balance FROM transactions
        WHERE user_id = ${userId};
      `
      : this.prisma.$queryRaw`
        SELECT SUM(CASE WHEN type = 'CREDIT' THEN amount ELSE -amount END) AS balance FROM transactions;
      `;
    const queryResult = await query;

    const balance: bigint = queryResult[0].balance || BigInt(0);

    return Number(balance);
  }

  async create(transaction: Transaction): Promise<void> {
    const mapped = PrismaTransactionMapper.toPrisma(transaction);

    await this.prisma.transaction.create({
      data: mapped,
    });
  }
}
