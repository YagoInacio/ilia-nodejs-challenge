import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionType } from '@transactions/entities/transaction';
import { CreateTransaction } from '@transactions/useCases/createTransaction.service';
import { ListTransactions } from '@transactions/useCases/listTransactions.service';
import { GetBalance } from '@transactions/useCases/getBalance.service';
import { CreateTransactionBody } from '../dtos/createTransactionBody';
import {
  TransactionViewModel,
  TransactionViewModelSchema,
} from '../viewModels/transactionViewModel';
import {
  BalanceViewModel,
  BalanceViewModelSchema,
} from '../viewModels/balanceViewModel';

@Controller('transactions')
@ApiTags('Transactions')
@ApiBearerAuth()
export class TransactionsController {
  constructor(
    private createTransaction: CreateTransaction,
    private listTransactions: ListTransactions,
    private getBalance: GetBalance,
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

  @Get('balance')
  @ApiOkResponse({
    description: 'OK',
    type: BalanceViewModelSchema,
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  @ApiQuery({ name: 'userId', required: false })
  async balance(@Query('userId') userId: string) {
    // TODO: get userId from token
    const balance = await this.getBalance.execute({ userId });

    return BalanceViewModel.toHTTP(balance);
  }
}
