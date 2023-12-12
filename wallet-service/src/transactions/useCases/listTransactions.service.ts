import { Injectable } from '@nestjs/common';
import {
  ListTransactionsInputDTO,
  ListTransactionsOutputDTO,
} from '@transactions/dtos/listTransactionsDTOs';
import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';

@Injectable()
export class ListTransactions {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(
    input: ListTransactionsInputDTO,
  ): Promise<ListTransactionsOutputDTO> {
    const { userId, type } = input;

    const transactions = await this.transactionsRepository.listByUserId(
      userId,
      type,
    );

    return { transactions };
  }
}
