import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
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
  @ApiOkResponse({
    description: 'OK',
    type: [TransactionViewModelSchema],
  })
  @ApiResponse({
    status: 401,
    description: 'Access token is missing or invalid',
  })
  async list(@Query('type') type: string, @Req() request) {
    const { id: userId } = request.user;

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
  async balance(@Req() request) {
    const { id: userId } = request.user;

    const balance = await this.getBalance.execute({ userId });

    return BalanceViewModel.toHTTP(balance);
  }
}
