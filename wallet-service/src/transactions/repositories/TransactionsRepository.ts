import { Transaction, TransactionType } from '../entities/transaction';

export abstract class TransactionsRepository {
  abstract listAll(filters: {
    userId?: string;
    type?: TransactionType;
  }): Promise<Transaction[]>;
  abstract getBalance(userId?: string): Promise<number>;
  abstract create(transaction: Transaction): Promise<void>;
}
