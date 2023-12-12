import { Module } from '@nestjs/common';
import { TransactionsController } from './infra/http/controllers/transactions.controller';
import { CreateTransaction } from './useCases/createTransaction.service';

@Module({
  imports: [],
  controllers: [TransactionsController],
  providers: [CreateTransaction],
})
export class TransactionsModule {}
