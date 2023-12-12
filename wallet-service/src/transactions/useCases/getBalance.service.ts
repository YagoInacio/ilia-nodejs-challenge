import { Injectable } from '@nestjs/common';
import {
  GetBalanceInputDTO,
  GetBalanceOutputDTO,
} from '@transactions/dtos/getBalanceDTOs';
import { TransactionsRepository } from '@transactions/repositories/TransactionsRepository';

@Injectable()
export class GetBalance {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute(input: GetBalanceInputDTO): Promise<GetBalanceOutputDTO> {
    const { userId } = input;

    const balance = await this.transactionsRepository.getBalance(userId);

    return { amount: balance };
  }
}
