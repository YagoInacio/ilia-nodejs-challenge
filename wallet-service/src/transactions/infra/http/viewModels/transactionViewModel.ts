import { ApiProperty } from '@nestjs/swagger';
import {
  Transaction,
  TransactionType,
} from '@transactions/entities/transaction';

export class TransactionViewModelSchema {
  @ApiProperty()
  id: string;
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  type: TransactionType;
}

export class TransactionViewModel {
  static toHTTP(transaction: Transaction): TransactionViewModelSchema {
    return {
      id: transaction.id,
      user_id: transaction.userId,
      amount: transaction.amount,
      type: transaction.type,
    };
  }
}
