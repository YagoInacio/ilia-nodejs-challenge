import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';
import { Transaction as PrismaTransaction } from '@prisma/client';

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction): PrismaTransaction {
    return {
      id: transaction.id,
      userId: transaction.userId,
      amount: transaction.amount,
      type: transaction.type,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  static toDomain(raw: PrismaTransaction): Transaction {
    return new Transaction(
      {
        userId: raw.userId,
        amount: raw.amount,
        type: raw.type as TransactionType,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );
  }
}
