import { Module } from '@nestjs/common';
import { TransactionsController } from './infra/http/controllers/transactions.controller';
import { CreateTransaction } from './useCases/createTransaction.service';
import { ListTransactions } from './useCases/listTransactions.service';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [CreateTransaction, ListTransactions],
})
export class TransactionsModule {}
