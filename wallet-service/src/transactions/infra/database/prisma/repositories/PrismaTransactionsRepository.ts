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

  async findById(id: string): Promise<Transaction> {
    throw new Error('Method not implemented.');
  }

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
    throw new Error('Method not implemented.');
  }

  async create(transaction: Transaction): Promise<void> {
    const mapped = PrismaTransactionMapper.toPrisma(transaction);

    await this.prisma.transaction.create({
      data: mapped,
    });
  }

  async save(transaction: Transaction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
