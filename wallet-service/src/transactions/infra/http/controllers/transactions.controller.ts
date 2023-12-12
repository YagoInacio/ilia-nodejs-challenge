import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransaction } from '@transactions/useCases/createTransaction.service';
import { CreateTransactionBody } from '../dtos/createTransactionBody';
import {
  TransactionViewModel,
  TransactionViewModelSchema,
} from '../viewModels/transactionViewModel';
import { ListTransactions } from '@transactions/useCases/listTransactions.service';
import { TransactionType } from '@transactions/entities/transaction';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {
  constructor(
    private createTransaction: CreateTransaction,
    private listTransactions: ListTransactions,
  ) {}

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

  @Get()
  @ApiQuery({ name: 'type', enum: TransactionType, required: false })
  @ApiQuery({ name: 'userId', required: false })
  @ApiOkResponse({
    description: 'OK',
    type: [TransactionViewModelSchema],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  async list(@Query('type') type: string, @Query('userId') userId: string) {
    // TODO: get userId from token
    const { transactions } = await this.listTransactions.execute({
      userId,
      type: type as TransactionType,
    });

    return transactions.map(TransactionViewModel.toHTTP);
  }
}
