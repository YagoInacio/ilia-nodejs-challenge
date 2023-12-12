import { Injectable } from '@nestjs/common';
import {
  ListTransactionsInputDTO,
  ListTransactionsOutputDTO,
} from '@transactions/dtos/listTransactionsDTOs';
import { TransactionType } from '@transactions/entities/transaction';
import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';

@Injectable()
export class ListTransactions {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(
    input: ListTransactionsInputDTO,
  ): Promise<ListTransactionsOutputDTO> {
    const { userId, type } = input;

    if (
      type &&
      type !== TransactionType.CREDIT &&
      type !== TransactionType.DEBIT
    ) {
      // TODO: exception handling
      throw new Error('Invalid Type');
    }
    const transactions = await this.transactionsRepository.listAll({
      userId,
      type,
    });

    return { transactions };
  }
}
