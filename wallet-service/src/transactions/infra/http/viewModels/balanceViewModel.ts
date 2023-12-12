import { ApiProperty } from '@nestjs/swagger';
import { GetBalanceOutputDTO } from '@transactions/dtos/getBalanceDTOs';

export class BalanceViewModelSchema {
  @ApiProperty()
  amount: number;
}

export class BalanceViewModel {
  static toHTTP(balance: GetBalanceOutputDTO): BalanceViewModelSchema {
    return {
      amount: balance.amount,
    };
  }
}
