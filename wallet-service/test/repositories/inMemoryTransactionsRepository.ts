import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';
import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public transactions: Transaction[] = [];

  async listAll(filters: {
    userId?: string;
    type?: TransactionType;
  }): Promise<Transaction[]> {
    let transactions = this.transactions;

    if (filters.userId) {
      transactions = transactions.filter(
        (item) => item.userId === filters.userId,
      );
    }

    if (filters.type) {
      transactions = transactions.filter((item) => item.type === filters.type);
    }

    return transactions;
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
}
