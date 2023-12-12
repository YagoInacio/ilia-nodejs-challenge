import { Transaction, TransactionType } from '../entities/transaction';

export interface CreateTransactionInputDTO {
  userId: string;
  amount: number;
  type: TransactionType;
}

export interface CreateTransactionOutputDTO {
  transaction: Transaction;
}
