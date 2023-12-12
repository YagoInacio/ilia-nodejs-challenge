import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';

export interface ListTransactionsInputDTO {
  userId: string;
  type?: TransactionType;
}

export interface ListTransactionsOutputDTO {
  transactions: Transaction[];
}
