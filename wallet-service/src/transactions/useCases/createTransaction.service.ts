import { Injectable } from '@nestjs/common';
import {
  CreateTransactionInputDTO,
  CreateTransactionOutputDTO,
} from '../dtos/createTransactionDTOs';
import { TransactionsRepository } from '../repositories/TransactionsRepository';
import { Transaction } from '../entities/transaction';

@Injectable()
export class CreateTransaction {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(
    input: CreateTransactionInputDTO,
  ): Promise<CreateTransactionOutputDTO> {
    const { userId, type, amount } = input;

    const transaction = new Transaction({
      userId,
      type,
      amount,
    });

    await this.transactionsRepository.create(transaction);

    return { transaction };
  }
}
