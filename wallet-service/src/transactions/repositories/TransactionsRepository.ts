import { Transaction, TransactionType } from '../entities/transaction';

export abstract class TransactionsRepository {
  abstract findById(id: string): Promise<Transaction | null>;
  abstract listAll(): Promise<Transaction[]>;
  abstract listByUserId(
    userId: string,
    type?: TransactionType,
  ): Promise<Transaction[]>;
  abstract getBalance(userId?: string): Promise<number>;
  abstract create(transaction: Transaction): Promise<void>;
  abstract save(transaction: Transaction): Promise<void>;
}
