import { AppError } from '@errors/appError.exception';
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
      throw new AppError('Invalid Type');
    }
    const transactions = await this.transactionsRepository.listAll({
      userId,
      type,
    });

    return { transactions };
  }
}
