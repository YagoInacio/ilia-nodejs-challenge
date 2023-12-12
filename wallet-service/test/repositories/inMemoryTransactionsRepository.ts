import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';
import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public transactions: Transaction[] = [];

  async findById(id: string): Promise<Transaction | null> {
    const transaction = this.transactions.find((item) => item.id === id);

    if (!transaction) {
      return null;
    }

    return transaction;
  }

  async listAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async listByUserId(
    userId: string,
    type?: TransactionType,
  ): Promise<Transaction[]> {
    if (type) {
      return this.transactions.filter(
        (item) => item.userId === userId && item.type === type,
      );
    }

    return this.transactions.filter((item) => item.userId === userId);
  }

  async getBalance(userId?: string): Promise<number> {
    const transactionsToEval = userId
      ? this.transactions.filter((item) => item.userId === userId)
      : this.transactions;

    const balance = transactionsToEval.reduce((acc, item) => {
      if (item.type === TransactionType.CREDIT) {
        return acc + item.amount;
      }
      return acc - item.amount;
    }, 0);

    return balance;
  }

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async save(transaction: Transaction): Promise<void> {
    const transactionIndex = this.transactions.findIndex(
      (item) => item.id === transaction.id,
    );

    if (transactionIndex >= 0) {
      this.transactions[transactionIndex] = transaction;
    }
  }
}
