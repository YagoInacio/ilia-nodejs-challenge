import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransaction } from '@transactions/useCases/createTransaction.service';
import { CreateTransactionBody } from '../dtos/createTransactionBody';
import {
  TransactionViewModel,
  TransactionViewModelSchema,
} from '../viewModels/transactionViewModel';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private createTransaction: CreateTransaction) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Transaction created',
    type: TransactionViewModelSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  async create(
    @Body() body: CreateTransactionBody,
  ): Promise<TransactionViewModelSchema> {
    const { user_id: userId, amount, type } = body;

    const { transaction } = await this.createTransaction.execute({
      userId,
      amount,
      type,
    });

    return TransactionViewModel.toHTTP(transaction);
  }
}
